import dotenv from "dotenv";
dotenv.config();
import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/dist/document";
import { ChromaClient } from "chromadb";
import ProjectFile_VectorID_Model from "../models/project_idsModel";

const openAIApiKey = <string>(<unknown>process.env.OPEN_AI_API_KEY);

const embeddingsFunc = new OpenAIEmbeddings({
    openAIApiKey: openAIApiKey,
    modelName: "text-embedding-ada-002",
});

const vectorStore = new Chroma(embeddingsFunc, {
    collectionName: "continuous-evaluation",
    collectionMetadata: {
        "hnsw:space": "cosine",
    },
    url: process.env.CHROMA_DB_URL,
});

export const insertIntoVectorDB = async (document: Document[]) => {
    const fileName = document[0].metadata.fileName;
    const project_id = document[0].metadata.project_id;
    const delRes = await deleteFromDB(fileName, project_id);
    const ids = await vectorStore.addDocuments(document);
    console.log("New Filename:", document[0].metadata.fileName);
    console.log("New ProjectID:", document[0].metadata.project_id);
    await ProjectFile_VectorID_Model.create({
        projectID: document[0].metadata.project_id,
        projectFileName: document[0].metadata.fileName,
        vectorIds: ids,
    });
    return vectorStore;
};

const client = new ChromaClient({ path: process.env.CHROMA_DB_URL });
const collection = client
    .getCollection({
        name: "continuous-evaluation",
    })
    .catch(async (err) => {
        console.log(err);
        await client.createCollection({
            name: "continuous-evaluation",
        });
        return await client.getCollection({
            name: "continuous-evaluation",
        });
    });

export const deleteFromDB = async (fileName: string, project_id: string) => {
    try {
        const projectFile = await ProjectFile_VectorID_Model.findOne({
            projectFileName: fileName,
            projectID: project_id,
        });
        if (projectFile?.vectorIds) {
            const ids = <Array<string>>(<unknown>projectFile.vectorIds);
            // console.log(ids);
            if (ids) {
                (await collection).delete({
                    ids: ids,
                });
            }
            console.log("Deleted IDs", ids);
            await projectFile.deleteOne({ projectFileName: fileName, projectID: project_id });
            // console.log((await collection).get());
        } else {
            console.log("No such file existed to delete");
        }
    } catch (err) {
        console.log(err);
    }
};

const getRetriver = async () => {
    const db = await Chroma.fromExistingCollection(embeddingsFunc, {
        collectionName: "continuous-evaluation",
        collectionMetadata: {
            "hnsw:space": "cosine",
        },
        url: process.env.CHROMA_DB_URL,
    });
    return db.asRetriever({
        searchKwargs: {
            fetchK: 3,
        },
    });
};

export const getRelevantDocsFromRetriver = async (output: string, project_id: string) => {
    const retriever = await getRetriver();
    const relDocs = await retriever.getRelevantDocuments(output);
    // console.log(relDocs);
    return relDocs.filter((doc) => {
        return doc.metadata.project_id === project_id;
    });
};

export const clearDB = async (is_delete: boolean) => {
    try {
        if (is_delete) {
            return await client.deleteCollection({ name: "continuous-evaluation" });
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const showDB = async () => {
    try {
        return (await collection).get({
            include: ["metadatas" as any],
        });
    } catch (err) {
        return err;
    }
};
