import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password1, password2 }
    } = req;

    if (password1 !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "join" });
    } else {
        try {
            await User.register(new User({ userName: name, email }), password1);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login", userName: req.body.name });
};

export const postLogin = passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login
});

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.login);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetails = (req, res) =>
    res.render("userDetails", { pageTitle: "User Details" });
export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });

export const githubCallBack = async (_, __, profile, cb) => {
    const {
        _json: { id, login: name, email, avatar_url }
    } = profile;

    try {
        let user;
        user = await User.findOne({ userName: name });

        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }

        user = await User.create({
            userName: name,
            email,
            avataUrl: avatar_url,
            gitHubId: id
        });
        return cb(null, user);
    } catch (error) {
        console.log(error);
        return cb(error);
    }
};

export const githubLogin = passport.authenticate("github");

export const fromGithub = passport.authenticate("github", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const getMe = (req, res) => {
    console.log(req.user);
    res.render("userDetails", { pageTitle: "My Detail", user: req.user });
};

export const googleLogin = passport.authenticate("google", {
    scope: ["profile"]
});

export const googleCallBack = async (_, __, profile, cb) => {
    const {
        id,
        _json: { name, picture }
    } = profile;

    try {
        /*const updatedUser = await User.findOneAndUpdate(
            { userName: name },
            { new: true },
            function(error, user) {
                if (error) throw error;

                user.userName = name;
                user.avataUrl = picture;
                user.googleId = id;

                console.log(user);

                user.save();
                return cb(null, user);
            }
        );
        return cb(null, updatedUser);
        */

        await User.findOneAndUpdate(
            { userName: name },
            { avataUrl: picture, googleId: id },
            { upsert: true, new: true },
            function(error, user) {
                if (error) throw error;
                return cb(null, user);
            }
        );
    } catch (error) {
        console.log(error);
        cb(error);
    }
};

export const fromGoogle = passport.authenticate("google", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});
