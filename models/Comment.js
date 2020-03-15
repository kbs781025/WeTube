import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: {type: String, required: "Text is required."},
    createData: {type: Date, default: Date.now}
})

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;