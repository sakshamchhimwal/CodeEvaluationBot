import axios from "axios";
import { SERVER_URL } from "../constants";

const token = localStorage.getItem('token');


export const fetchAllUserProjects = async () => {
    const url = `${SERVER_URL}user/dev/newUser`;
    const userData = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return userData;
}

export const fetchProjectDetails = async (projectId) => {
    const url = `${SERVER_URL}user/dev/projectDets`;
    const projDets = await axios.get(url, {
        params: { projectId: projectId },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return projDets.data;
}

async function fetchGitHubRepoFiles(fullName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${fullName}/git/trees/main?recursive=1`);

        if (!response.ok) {
            throw new Error(`Failed to fetch repository files. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.tree) {
            const files = data.tree.filter((item) => item.type === 'blob').map((item) => item.path);
            return files;
        } else {
            throw new Error('Unable to retrieve file data from the GitHub API.');
        }
    } catch (error) {
        console.error('Error fetching repository files:', error.message);
        return [];
    }
}


export const fetchFilesFromRepo = async (projectId) => {
    const url = `${SERVER_URL}user/dev/projectName`;
    const projName = await axios.get(url, {
        params: { projectId: projectId },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const name = projName.data.name;
    const files = await fetchGitHubRepoFiles(name);
    return files;
}

export async function fetchGitHubFile(projectId, path) {
    try {
        const url = `${SERVER_URL}user/dev/projectName`;
        const projName = await axios.get(url, {
            params: { projectId: projectId },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const name = projName.data.name;
        const response = await fetch(`https://api.github.com/repos/${name}/contents/${path}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch file contents. Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.content) {
            const decodedContent = atob(data.content);
            return decodedContent;
        } else {
            throw new Error('Unable to retrieve file content from the GitHub API.');
        }
    } catch (error) {
        console.error('Error fetching file contents:', error.message);
        return null;
    }
}

export async function fetchCompleteScore(projectId) {
    try {
        console.log("called");
        const url = `${SERVER_URL}user/chat`;
        let res = await axios.get(url, {
            params: { project_id: projectId, type: "complete" },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);
        const userName = (await (await fetchAllUserProjects()).json()).Details.userGithubUserName;
        return res.data.filter((ele) => {
            return ele.devloperName === userName;
        });
        // if (projectId === "658140169d91ffea03f97e12") return [
        //     {
        //         "devloperName": "sakshamchhimwal",
        //         "functionName": "genrateWebHookHandler",
        //         "score": {
        //             "OverallScore": "8",
        //             "BugsScore": "6",
        //             "Bugs": "The addRepoToClientProjs function does not handle errors properly. It should have error handling and logging for any database operation failures.\nThe genrateWebHookHandler function does not handle the case where the authToken or repoName is not provided in the request properly. It should validate the input and return an error if the required parameters are missing.",
        //             "ReadblityScore": "9",
        //             "ReadblityIssues": "The variable names are clear and descriptive.\nThe function names are self-explanatory and follow the camelCase convention.\nComments are missing from many parts of the code which makes it difficult to understand the purpose of some operations."
        //         }
        //     },
        //     {
        //         "devloperName": "sakshamchhimwal",
        //         "functionName": "getClientRequirements",
        //         "score": {
        //             "OverallScore": "7",
        //             "BugsScore": "4",
        //             "Bugs": "One of the bugs is that the variable names are not very descriptive. For example, the variable `ele` could be better named to something like `projectID`. The code also lacks proper comments for explaining the logic.",
        //             "ReadblityScore": "6",
        //             "ReadblityIssues": "The lack of proper variable names makes the code less readable and can create confusion for anyone reading the code. The absence of comments also makes it difficult to understand the logic."
        //         }
        //     }
        // ];

        // if (projectId === "65812dc506a8d302d78fabc7") return [
        //     {
        //         "devloperName": "sakshamchhimwal",
        //         "functionName": "Lobby",
        //         "score": {
        //             "OverallScore": "8",
        //             "BugsScore": "7",
        //             "Bugs": "The function handleCallUser in the component RoomPage is not checking for errors or handling promise rejections when calling getUserMedia and getOffer, which could lead to unhandled exceptions. The function also emits a socket event without checking if the socket connection is established, and could potentially cause errors if the socket is not ready.",
        //             "ReadblityScore": "4",
        //             "ReadblityIssues": "The function handleCallUser in the component RoomPage does not have clear comments or variable names, making it difficult to understand its purpose at a glance. The function is also quite long and could be refactored for better readability."
        //         }
        //     },
        //     {
        //         "devloperName": "sakshamchhimwal",
        //         "functionName": "Room",
        //         "score": {
        //             "OverallScore": "7",
        //             "BugsScore": "8",
        //             "Bugs": "The Room function seems to be missing from the provided code snippets. Therefore, I am unable to identify any bugs.",
        //             "ReadblityScore": "6",
        //             "ReadblityIssues": "The code lacks proper indentation and comments. Variable names could be more descriptive to improve code readability."
        //         }
        //     }
        // ];

        // if (projectId === "65679b8ba2415895a7ae0f95") return [
        //     {
        //         "devloperName": "sakshamchhimwal",
        //         "functionName": "deleteTimeTableHandler",
        //         "score": {
        //             "OverallScore": "7",
        //             "BugsScore": "8",
        //             "Bugs": "- The code has inconsistent variable naming\n- Potential mishandling of promises with the use of try...catch\n- Redundant code with multiple definitions of the same function (deleteTimeTableHandler)",
        //             "ReadblityScore": "6",
        //             "ReadblityIssues": "- Inconsistent formatting and indentation\n- Lacks comments and explanations"
        //         }
        //     },
        //     {
        //         "devloperName": "sakshamchhimwal",
        //         "functionName": "getTimeSeries",
        //         "score": {
        //             "OverallScore": "8",
        //             "BugsScore": "4",
        //             "Bugs": "There are no specific bugs in the function getTimeSeries. The code seems mostly fine with no obvious errors or issues. However, it's important to have proper error handling in place for failed async operations.",
        //             "ReadblityScore": "7",
        //             "ReadblityIssues": "The code is mostly readable and understandable. There is room for improvement in variable naming and comments. Also, the error messages provided in the catch blocks are not very descriptive and could be improved for better understanding."
        //         }
        //     }
        // ];


    } catch (error) {
        console.error('Error fetching file contents:', error.message);
        const err = error;
    }
}

export async function getBugs(projectID, functionName) {
    try {
        const url = `${SERVER_URL}user/chat`;
        let res = await axios.get(url, {
            params: {
                project_id: projectID,
                type: "bugs",
                functionName: functionName
            }
        })
        return res.data();
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function fetchProjectDocumentation(projectId) {
    try {
        if (projectId) {
            const url = `${SERVER_URL}user/dev/docs`
            let res = await axios.get(url, {
                params: { projectId: projectId },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data;
        }
    } catch (err) {
        console.log(err);
    }
}