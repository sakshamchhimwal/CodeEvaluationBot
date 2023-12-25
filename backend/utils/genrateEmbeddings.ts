import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// Constants
const openAIApiKey = <string>(<unknown>process.env.OPEN_AI_API_KEY);

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1200,
    chunkOverlap: 200,
});
const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-ada-002",
    openAIApiKey: openAIApiKey,
});

export const genrateEmbeddings = async (text: string) => {
    const texts = await splitter.splitText(text);
    const embedDocs = await embeddings.embedDocuments(texts);
    return embedDocs;
};

export const createDocmentFromText = async (text: string, fileName: string, project_id: string) => {
    const doc = await splitter.createDocuments(
        [text],
        [{ fileName: fileName, project_id: project_id }]
    );
    return doc;
};
