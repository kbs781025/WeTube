import mongoose from "mongoose";
import passportLocal from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    avatarUrl: String,
    gitHubId: Number,
    googleId: Number,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

userSchema.plugin(passportLocal, { usernameField: "email" });

const userModel = mongoose.model("User", userSchema);

export default userModel;
