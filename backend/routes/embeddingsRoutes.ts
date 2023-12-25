import express, { Request, Response, NextFunction, Router } from "express";
import { compareAndUpdateEmbeddingsHandler } from "../controller/embeddings.controller";
const router: Router = express.Router();

router.post("/compareAndUpdateEmbeddings", compareAndUpdateEmbeddingsHandler);

export default router;
