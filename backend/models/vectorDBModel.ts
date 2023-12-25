import { DataType } from "@zilliz/milvus2-sdk-node";

export const VectorDBModel = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
    },
    {
        name: "project_id__file_name",
        data_type: DataType.VarChar,
        max_length: 500,
    },
    {
        name: "project_id",
        data_type: DataType.VarChar,
        max_length: 500,
    },
    {
        name: "code_or_req",
        data_type: DataType.Bool, // code = 0 | req = 1
        default: false,
    },
    {
        name: "embedding_vectors",
        data_type: DataType.FloatVector,
        dim: 1536,
    },
];
