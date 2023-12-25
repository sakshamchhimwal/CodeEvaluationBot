import express, { Router, Request, Response, NextFunction } from "express";
import {
    addUserDocs,
    addUserProjects,
    deleteUserDocs,
    deleteUserProject,
    genrateWebHookHandler,
    getClientRequirements,
    getProjcetDetails,
    getProjectName,
    getUserDocs,
    listClientProjects,
    listUserProjects,
    newClientRequirements,
    newUser,
    openGetProjectDetails,
    repoListHandler,
    updateClientRequirements,
    updateUserDocs,
    clientGetProjectName
} from "../controller/user.controller";
import { newChatInstance } from "../controller/chat.controller";

const RATE_LIMIT_INTERVAL = 5000; // 5 seconds in milliseconds
let lastRequestTime = 0;

// Middleware to enforce rate limiting
const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const currentTime = Date.now();
    console.log(currentTime);
    if (currentTime - lastRequestTime < RATE_LIMIT_INTERVAL) {
        // Too many requests within the interval
        return res.status(429).send({ error: "Rate limit exceeded. Try again later." });
    }

    // Update the last request time
    lastRequestTime = currentTime;
    next();
};

const router: Router = express.Router();

router.get("/genrateWebHook", genrateWebHookHandler);

router.get("/chat", rateLimiter, newChatInstance);

router.get("/client/listClientRepo", repoListHandler);

router.get("/client/projects", listClientProjects);

router.get("/client/projectDets", openGetProjectDetails);

router.get("/client/docs", getClientRequirements);

router.post("/client/docs", newClientRequirements);

router.patch("/client/docs", updateClientRequirements);

router.get("/client/projectName", clientGetProjectName);

router.get("/dev/docs", getUserDocs);

router.post("/dev/docs", addUserDocs);

router.patch("/dev/docs", updateUserDocs);

router.delete("/dev/docs", deleteUserDocs);

router.get("/dev/newUser", newUser);

router.get("/dev/projects", listUserProjects);

router.put("/dev/projects", addUserProjects);

router.delete("/dev/projects", deleteUserProject);

router.get("/dev/projectDets", getProjcetDetails);

router.get("/dev/projectName", getProjectName);

export default router;
