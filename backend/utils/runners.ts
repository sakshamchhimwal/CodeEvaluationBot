import { RunnableSequence } from "langchain/schema/runnable";
import { getRelevantDocsFromRetriver } from "./chromadbFunctions";
import { formatDocumentsAsString } from "langchain/util/document";
import { model, memory } from "../controller/chat.controller";
import {
    alignmentParser,
    analyser,
    bugScore,
    codeReadblityParser,
    docReader,
    documentationParser,
    makeBugParser,
    readablityScore,
} from "./prompts";
import Model_ProjDocs from "../models/projectDocs";
import { UserDocumentation } from "../controller/user.controller";

const parseDevDocsToText = (devDocs: UserDocumentation[]) => {
    let parsedDocs: string = "";
    devDocs.forEach((ele) => {
        parsedDocs += `**Function Name** : ${ele.function_name} \n \
                        **Function Description** : ${ele.function_description} \n \
                        **Time Taken** : ${ele.time_taken} \n \
                        **Bugs** : ${ele.bugs} \n \
                        **Devloper** : ${ele.username} \n\n`;
    });
    return parsedDocs;
};

export const findBugs = async (output: string, project_id: string) => {
    // console.log("L-31 Runner.ts");
    const bugFinderChain = RunnableSequence.from([
        {
            functionName: () => output,
            chat_history: async () => {
                const { chat_history } = await memory.loadMemoryVariables({});
                return chat_history;
            },
            context: async () => {
                const relevantDocs = await getRelevantDocsFromRetriver(output, project_id);
                // // console.log(relevantDocs);
                return formatDocumentsAsString(relevantDocs);
            },
            format_instructions: () => makeBugParser(output).getFormatInstructions().toString(),
        },
        bugScore,
        model,
        makeBugParser(output),
    ]);
    // console.log("L-50 Runner.ts");
    return await bugFinderChain.invoke({});
};

export const checkReadblity = async (output: string, project_id: string) => {
    const readblityChain = RunnableSequence.from([
        {
            functionName: () => output,
            chat_history: async () => {
                const { chat_history } = await memory.loadMemoryVariables({});
                return chat_history;
            },
            context: async () => {
                const relevantDocs = await getRelevantDocsFromRetriver(output, project_id);
                return formatDocumentsAsString(relevantDocs);
            },
            format_instructions: () =>
                codeReadblityParser(output).getFormatInstructions().toString(),
        },
        readablityScore,
        model,
        codeReadblityParser(output),
    ]);
    return await readblityChain.invoke({});
};

export type DocumentationObject = {
    functionName: string;
    description: string;
    timeTaken: string;
    bugs: string;
    devloperName: string;
};

export const documentationAnalyser = async (
    documentation: DocumentationObject,
    project_id: string
) => {
    // console.log("L-86: ", documentation);
    const documentationAnalyserChain = RunnableSequence.from([
        {
            functionName: () => documentation.functionName,
            chat_history: async () => {
                const { chat_history } = await memory.loadMemoryVariables({});
                return chat_history;
            },
            context: async () => {
                const relevantDocs = await getRelevantDocsFromRetriver(
                    documentation.functionName,
                    project_id
                );
                return formatDocumentsAsString(relevantDocs);
            },
            description: () => documentation.description,
            timeTaken: () => documentation.timeTaken,
            bugs: () => documentation.bugs,
            format_instructions: () =>
                documentationParser(documentation).getFormatInstructions().toString(),
        },
        analyser,
        model,
        documentationParser(documentation),
    ]);

    const res: any = await documentationAnalyserChain.invoke({});
    // console.log("L-113", res);
    return res;
};



export const progressAnalyser = async (projectId: string) => {
    const projectDocs = await Model_ProjDocs.findOne({ projectID: projectId });
    const clientRequirements: string = projectDocs?.clientReq as string;
    const devDocs = <UserDocumentation[]>(<unknown>projectDocs?.docs);
    const parsedDevDocs: string = parseDevDocsToText(devDocs);
    const progressAnalyserChain = RunnableSequence.from([
        {
            clientRequirements: () => clientRequirements,
            documentation: () => parsedDevDocs,
            format_instructions: () => alignmentParser().getFormatInstructions().toString(),
        },
        docReader,
        model,
        alignmentParser(),
    ]);
    return await progressAnalyserChain.invoke({});
};

export const eachFunctionAnalyser = async (projectId: string) => {
    const projectDocs = await Model_ProjDocs.findOne({ projectID: projectId });
    const clientRequirements: string = projectDocs?.clientReq as string;
    const devDocs = <UserDocumentation[]>(<unknown>projectDocs?.docs);
    // console.log("L-136 Rnner");
    const results = await Promise.all(
        devDocs.map(async (ele) => {
            // console.log(ele);
            const doc: DocumentationObject = {
                functionName: ele.function_name,
                description: ele.function_description,
                timeTaken: ele.time_taken,
                bugs: ele.bugs,
                devloperName: ele.username,
            };
            const modelResult = await model;
            return {
                devloperName: ele.username,
                functionName: ele.function_name,
                score: await documentationAnalyser(doc, projectId),
            };
        })
    );
    return results;
};

