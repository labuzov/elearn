import { OrganizationCreateModel, OrganizationModel, OrganizationUpdateModel } from '@Models';
import db from '@DataBase';

import { dataBaseService } from './DataBaseService';


class OrganizationService {

    public async getOrganizationById(id: number) {
        const result = await db.query(`SELECT * FROM "Organizations" WHERE "Id" = $1`, [id]);

        if (result) return dataBaseService.parseObjectsFirstLetters(result.rows)[0] as OrganizationModel;
    }

    public async createOrganization(model: OrganizationCreateModel) {
        const { title, email, tel, place, additional } = model;

        const result = await db.query(`INSERT INTO "Organizations" ("Title", "Email", "Tel", "Place", "Additional") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [title, email, tel, place, additional]);
        if (result) return dataBaseService.parseObjectsFirstLetters(result.rows)[0] as OrganizationModel;
    }

    public async updateOrganization(model: OrganizationUpdateModel) {
        const { id, title, email, tel, place, additional } = model;

        const result = await db.query(`UPDATE "Organizations" SET "Title" = $2, "Email" = $3, "Tel" = $4, "Place" = $5, "Additional" = $6 WHERE "Id" = $1 RETURNING *`, [id, title, email, tel, place, additional]);

        if (result) return dataBaseService.parseObjectsFirstLetters(result.rows)[0] as OrganizationModel;
    }
}

export const organizationService = new OrganizationService();
