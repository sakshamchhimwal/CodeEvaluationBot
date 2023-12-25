import mongoose, { Model, Schema } from "mongoose";
const clientProjModel = new Schema({
    clientGithubUserName: {
        type: Schema.Types.String,
        require: true,
        unique: true
    },
    clientAuthToken: {
        type: Schema.Types.String,
        require: true,
    },
    projects: {
        type: Schema.Types.Array,
    },
});

const model = mongoose.model("ClientProjModel", clientProjModel);
export default model;
