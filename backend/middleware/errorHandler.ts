import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return next(createHttpError(500, "Internal Server Error"));
};
