import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userContext } from '../services/userContextService';
import { UserContextResource } from '../resources/user-context/user.context.resource';

export function userContextMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    let context: UserContextResource | undefined;

    if (authHeader?.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

            context = {
                userId: decoded.sub,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role,
            };
        } catch {
            context = undefined;
        }
    }

    if (context) {
        userContext.run(context, () => {
            next();//wait untl context set
        });
    } else {
        next();
    }
}
