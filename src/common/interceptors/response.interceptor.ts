// ---------- common/interceptors/response.interceptor.ts ----------
import { Request, Response, NextFunction } from 'express';

export const responseInterceptor = (_req: Request, res: Response, next: NextFunction) => {
    const oldJson = res.json;
    res.json = function (data: any) {
        return oldJson.call(this, { success: true, data });
    };
    next();
};
