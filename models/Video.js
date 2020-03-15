import mongoose from "mongoose"

const videoSchema = mongoose.Schema({
    fileUrl: {type: String, required: "File URL is required."},
    title: {type: String, required: "Title is required."},
    description: String,
    views: {type: Number, default: 0},
    createData: {type: Date, default: Date.now},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;