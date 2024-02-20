import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';


class SecurityService {
    public getLimiter() {
        const limiter = rateLimit({
            windowMs: 1000, // 1 sec
            limit: 10, // Limit each IP to N requests per `window`.
            // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        });

        return limiter;
    }

    public getHelmet() {
        const headersHelmet = helmet();

        return headersHelmet;
    }
}

export const securityService = new SecurityService();
