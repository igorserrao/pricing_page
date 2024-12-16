import { Request, Response, NextFunction } from 'express';

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
    const error = new Error('Not found');
    console.log(error);

    res.status(404).json({ error: 'Route NOT FOUND =/' });

    // Pass the error to the next middleware
    next(error);

    return;
}
