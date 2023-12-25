import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction, Router } from "express";
import { authTokenHandler } from "../controller/githubOAuth.controller";
const router: Router = express.Router();

const clientID = <string>(<unknown>process.env.GITHUB_CLIENT_ID);

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send(
        `<a href="https://github.com/login/oauth/authorize?scope=repo&client_id=${clientID}">Click here</a>`
    );
});

router.get("/githubOAuth", authTokenHandler);


export default router;
