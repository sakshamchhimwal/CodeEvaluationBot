import mongoose, { Schema } from "mongoose";
const projectAuthKeys = new Schema({
    projectName: Schema.Types.String,
    authToken: Schema.Types.String,
});

const model = mongoose.model("ProjectAuthKeys", projectAuthKeys);
export default model;
