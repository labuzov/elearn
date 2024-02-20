import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '@DataBase';
import { dataBaseService } from './DataBaseService';
import { TokenModel } from '@Models';


export type TokenPayload = {
    key: string;
    id: number;
    organizationId: number;
}

class AuthService {
    private _maxDeviceCount = 5;

    public generateTokens(key: string, userId: number, organizationId: number) {
        return {
            accessToken: this._generateAccessToken(key, userId, organizationId),
            refreshToken: this._generateRefreshToken(key, userId, organizationId)
        }
    }

    private _generateAccessToken(key: string, userId: number, organizationId: number) {
        const payload: TokenPayload = {
            key,
            id: userId,
            organizationId
        }
    
        return jwt.sign(payload, process.env.S_A_KEY!, { expiresIn: '15m' });
    }

    private _generateRefreshToken(key: string, userId: number, organizationId: number) {
        const payload: TokenPayload = {
            key,
            id: userId,
            organizationId
        }
    
        return jwt.sign(payload, process.env.S_R_KEY!, { expiresIn: '30d' });
    }

    public verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.S_A_KEY!) as TokenPayload;
        } catch {
            return null;
        }
    }

    public verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.S_R_KEY!) as TokenPayload;
        } catch {
            return null;
        }
    }

    public comparePasswords(password: string, hashPassword: string) {
        return bcrypt.compareSync(password, hashPassword);
    }

    public async saveToken(key: string, userId: number, token: string) {
        const result = await this.getAllTokens(userId);
        const tokenByKey = result?.find(token => token.key === key);
        const deviceCount = result?.length || 0;

        if (tokenByKey) {
            await this.updateToken(key, userId, token);
            return;
        }

        if (deviceCount >= this._maxDeviceCount) {
            await this.removeOldestToken(userId);
        }

        await this.addToken(key, userId, token);
    }

    public async getAllTokens(userId: number) {
        const result = await db.query(`SELECT * FROM "Tokens" WHERE "UserId" = $1`, [userId]);

        if (result) return dataBaseService.parseObjectsFirstLetters(result.rows) as TokenModel[];
    }

    public async updateToken(key: string, userId: number, token: string) {
        const timestamp = this._getTokenTimestamp();
        const result = await db.query(`UPDATE "Tokens" SET "Token" = $3, "Timestamp" = $4 WHERE "Key" = $1 AND "UserId" = $2 RETURNING *`, [key, userId, token, timestamp]);

        if (result) return dataBaseService.parseObjectsFirstLetters(result.rows)[0];
    }

    public async addToken(key: string, userId: number, token: string) {
        const timestamp = this._getTokenTimestamp();

        const result = await db.query(`INSERT INTO "Tokens" ("UserId", "Key", "Token", "Timestamp") VALUES ($1, $2, $3, $4) RETURNING *`, [userId, key, token, timestamp]);

        if (result) return dataBaseService.parseObjectsFirstLetters(result.rows)[0];
    }

    public async removeToken(token: string) {
        const tokenPayload = this.verifyRefreshToken(token);
        if (!tokenPayload) return;

        const { key, id } = tokenPayload;

        const result = await db.query(`DELETE FROM "Tokens" WHERE "Key" = $1 AND "UserId" = $2`, [key, id]);

        if (result) return true;
    }

    public async removeOldestToken(userId: number) {
        const result = await db.query(`DELETE FROM "Tokens" WHERE "Key" = (SELECT MIN("Key") FROM "Tokens" WHERE "UserId" = $1)`, [userId]);

        if (result) return true;
    }

    private _getTokenTimestamp() {
        return new Date().getTime();
    }
}

export const authService = new AuthService();
