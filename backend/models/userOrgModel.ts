import mongoose, { Model, Schema } from "mongoose";

const userOrgModel = new Schema({
    userGithubUserName: {
        type: Schema.Types.String,
        require: true,
        unique: true,
    },
    projects: {
        type: Schema.Types.Array,
        of: Schema.Types.ObjectId,
    },
    completedProjects: {
        type: Schema.Types.Array,
        of: Schema.Types.ObjectId,
    },
    score: {
        type: Schema.Types.Number,
        default: 0,
    },
});

const model = mongoose.model("userOrgModel", userOrgModel);
export default model;
