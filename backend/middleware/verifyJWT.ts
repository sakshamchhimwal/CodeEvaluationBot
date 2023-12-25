import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt, { Secret } from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decode = jwt.verify(token, <Secret>(<unknown>process.env.JWT_SECRET));
        req.body.authToken = decode;
        next();
    } else {
        return next(createHttpError(401, "Token not found"));
    }
};
