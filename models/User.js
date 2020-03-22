import mongoose from "mongoose";
import passportLocal from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    avatarUrl: String,
    gitHubId: Number,
    googleId: Number
});

userSchema.plugin(passportLocal, { usernameField: "email" });

const userModel = mongoose.model("User", userSchema);

export default userModel;
