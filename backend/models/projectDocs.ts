import mongoose, { Schema } from "mongoose";

const projectDocs = new Schema({
    projectID: Schema.Types.String,
    projectName: Schema.Types.String,
    docs: {
        type: Schema.Types.Array,
    },
    clientReq: {
        type: Schema.Types.String,
    },
    deadline: {
        type: Schema.Types.String,
    },
    membersIds: {
        type: [Schema.Types.String],
    },
});

const model = mongoose.model("ProjectDocs", projectDocs);
export default model;
