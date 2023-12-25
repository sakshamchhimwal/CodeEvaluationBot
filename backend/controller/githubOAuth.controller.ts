import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { NextFunction, Response, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import Model_ClientProj from "../models/clientProjModel";
import Model_UserOrg from "../models/userOrgModel";
import { getGitHubUserData } from "../utils/gihubAPICollections";

// Consts
const clientId = <string>(<unknown>process.env.GITHUB_CLIENT_ID);
const clientSecret = <string>(<unknown>process.env.GITHUB_CLIENT_SECRET);

// Code

export const authTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestToken = req.query.code;
        console.log(requestToken);
        axios({
            method: "POST",
            url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${requestToken}`,
            headers: {
                accept: "application/json",
            },
        }).then(async (result) => {
            const authToken = result.data.access_token;
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: authToken,
                },
                <Secret>(<unknown>process.env.JWT_SECRET)
            );
            res.cookie("token", token);
            const userData = await getGitHubUserData(authToken);
            const userName = userData.login;
            const isClient = await Model_ClientProj.findOne({ clientGithubUserName: userName });
            const isUser = await Model_UserOrg.findOne({ userGithubUserName: userName });
            if (isClient) {
                return res.redirect(`${process.env.GITHUB_REDIRECT_URI}role/client/dashboard`);
            } else if (isUser) {
                return res.redirect(`${process.env.GITHUB_REDIRECT_URI}role/talent/dashboard`);
            } else {
                return res.redirect(`${process.env.GITHUB_REDIRECT_URI}role`);
            }
        });
    } catch (err) {
        console.log("Error in github oauth login");
        return res.status(500);
    }
};
