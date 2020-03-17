import mongoose from "mongoose";
import passportLocal from "passport-local-mongoose";

const userSchema = new mongoose.Schema( {
    userName: String,
    email: String,
    avataUrl: String,
    gitHubId: Number,
    googleId: Number
});

userSchema.plugin(passportLocal, {usernameFiled: "email"});

const userModel = mongoose.model("User", userSchema);

export default userModel;