import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';

/**
 * @description function to catch async error
 * @param fn needed to cache async handle
 * @returns funcion with promise cache handled
 */
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
