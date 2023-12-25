import dotenv from "dotenv";
dotenv.config();
import { CreateIndexParam, CreateIndexSimpleReq, MilvusClient } from "@zilliz/milvus2-sdk-node";
import { VectorDBModel } from "../models/vectorDBModel";
import { connect } from "mongoose";

// Constants
const vectorClusterAddress = <string>(<unknown>process.env["VECTOR_CLUSTER_ENDPOINT"]);
const vectorClusterAPIKey = <string>(<unknown>process.env["VECTOR_CLUSTER_ENDPOINT_API_KEY"]);
const mongodbClustedAddress = <string>(<unknown>process.env.MONGO_CONNECTION_URI);
const collectionName = "test";

// Functions
export const connectToVectorDB = async () => {
    // Setting Up the MilvusClient
    const client = new MilvusClient({
        address: vectorClusterAddress,
        token: vectorClusterAPIKey,
    });
    if (client) {
        console.log("Connected to vector database");
    }

    // Creating the embeddings collection
    const collectionCreation = await client.createCollection({
        collection_name: collectionName,
        fields: VectorDBModel,
    });
    if (collectionCreation.code === 0) {
        console.log("Collection Created Successfully");
    } else {
        console.log(collectionCreation);
    }
    const decribeCollection = await client.describeCollection({
        collection_name: collectionName,
    });
    // console.log(decribeCollection.schema);

    // Creating index over the `embedding_vectors` field
    const index_params = {
        collection_name: collectionName,
        field_name: "embedding_vectors",
        index_type: "AUTOINDEX",
        metric_type: "L2",
        params: {},
    };
    const createIndex = await client.createIndex(index_params);
    if (createIndex.code === 0) {
        console.log("Index Created Successfully");
    }

    // Loading the collection
    const loadedCollection = await client.loadCollection({
        collection_name: collectionName,
    });
    if (loadedCollection.code === 0) {
        console.log("Collection Loaded Successfully");
    } else {
        console.log(loadedCollection);
    }
};

export const connectToMongoDb = async () => {
    // Connection code for MongoDB
    const res = await connect(mongodbClustedAddress);
    if (res) {
        console.log("Connected to MongoDb");
    }
};
