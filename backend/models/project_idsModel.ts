import mongoose, { Schema } from "mongoose";
const projectFileIds = new Schema({
    projectID: Schema.Types.String,
    projectFileName: Schema.Types.String,
    vectorIds: {
        type: Schema.Types.Array,
        of: Schema.Types.String,
    },
});

const model = mongoose.model("ProjectFileIds", projectFileIds);
export default model;
