import mongoose from "mongoose";

const userSchema = mongoose.Schema( {
    userName: String,
    email: String,
    avataUrl: String,
    gitHubId: String,
    googleId: String
});

const userModel = mongoose.model("User", userSchema);

export default userModel;