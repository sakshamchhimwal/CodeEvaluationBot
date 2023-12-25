import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { UserRepoObject } from "./interfaces/githubInterfaces";

export const getGitHubUserData = async (authToken: string) => {
    let res = await axios({
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return res.data;
};

export const getAllUserRepos = async (authToken: string, userName: string) => {
    const repos: UserRepoObject[] = [];
    let res = await axios({
        method: "GET",
        url: `https://api.github.com/users/${userName}/repos`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    const data: UserRepoObject[] = res.data;
    data.forEach((repo) => {
        repos.push({
            full_name: `http://localhost:8003/user/genrateWebHook?repoName=${encodeURI(
                repo.full_name as string
            )}`,
        });
    });
    return repos;
};

export const getLatestCommitLink = async (authToken: string, repoFullName: string) => {
    const res = await axios({
        method: "GET",
        url: `https://api.github.com/repos/${repoFullName}/git/refs/heads/master`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (res.status === 409) {
        return "";
    }
    return res.data.object.url;
};

type FileLocnObject = {
    path: string;
    blobURL: string;
};

export const getFilesInCommit = async (authToken: string, commitLink: string) => {
    let treeLink = await axios({
        method: "GET",
        url: `${commitLink}`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    treeLink = treeLink.data.tree.url;
    let files = await axios({
        method: "GET",
        url: `${treeLink}?recursive=1`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    const resObject: Array<FileLocnObject> = [];
    files.data.tree.forEach((ele: any) => {
        if (ele.type === "blob") {
            resObject.push({
                path: ele.path,
                blobURL: ele.url,
            });
        }
    });
    return resObject;
};

export const blobContentReader = async (authToken: string, blobURL: string) => {
    const blobContent = await axios.get(blobURL, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    const blobContentSplit = blobContent.data.content.split("\n");
    let filestring = "";
    blobContentSplit.forEach((ele: string) => {
        filestring += atob(ele);
    });
    return filestring;
};

export const genrateWebHook = async (authToken: string, repoName: string) => {
    const data = {
        name: "web",
        active: true,
        events: ["push"],
        config: {
            url: <string>(<unknown>process.env.WEBHOOK_TUNNEL_URL),
            content_type: "json",
            insecure_ssl: "0",
        },
    };
    const webHookGenrateResult = await axios({
        method: "POST",
        url: `https://api.github.com/repos/${decodeURI(repoName)}/hooks`,
        data: JSON.stringify(data),
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${authToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return webHookGenrateResult;
};

export const fileFilter = async (authToken: string, compare_url: string) => {
    const compareFiles = await axios({
        method: "GET",
        url: compare_url,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    const files: Array<any> = compareFiles.data.files;
    const modifiedFiles = files.filter((ele) => {
        return ele.status === "modified";
    });
    const newFiles = files.filter((ele) => {
        return ele.status === "added";
    });
    const removedFiles = files.filter((ele) => {
        return ele.status === "removed";
    });
    return {
        modifiedFiles: modifiedFiles,
        newFiles: newFiles,
        removedFiles: removedFiles,
    };
};
