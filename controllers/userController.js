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
    successRedirect: routes.me,
    failureRedirect: routes.login
});

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.login);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("videos");
        console.log(user);
        res.render("userDetails", {
            pageTitle: "User Details",
            user
        });
    } catch (err) {
        console.log(err);
        res.redirect(routes.home);
    }
};

export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });

export const getChangePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
    const {
        body: { currentPassword, newPassword, verifiedPassword }
    } = req;

    if (newPassword !== verifiedPassword) {
        res.redirect(routes.me);
        return;
    }

    await req.user.changePassword(currentPassword, newPassword, function(
        error
    ) {
        console.log(error);
        res.redirect(routes.me);
    });
    res.redirect(routes.me);
};

export const githubCallBack = async (_, __, profile, cb) => {
    const {
        _json: { id: gitHubId, login: userName, avatar_url: avatarUrl },
        emails
    } = profile;

    try {
        User.findOne({ gitHubId }, function(error, user) {
            if (error) throw error;

            if (user) return cb(null, user);

            let newUser = new User();
            newUser.email = emails[0].value;
            newUser.userName = userName;
            newUser.avatarUrl = avatarUrl;
            newUser.gitHubId = gitHubId;

            newUser.save(function(error) {
                if (error) throw error;
                return cb(null, newUser);
            });
        });
    } catch (error) {
        console.log(error);
        return cb(error);
    }
};

export const githubLogin = passport.authenticate("github");

export const fromGithub = passport.authenticate("github", {
    failureRedirect: routes.login,
    successRedirect: routes.me
});

export const getMe = (req, res) => {
    res.render("userDetails", { pageTitle: "My Detail", user: req.user });
};

export const googleLogin = passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
});

export const googleCallBack = async (_, __, profile, cb) => {
    const {
        id: googleId,
        _json: { name: userName, email, picture: avatarUrl }
    } = profile;

    try {
        User.findOne({ googleId }, function(error, user) {
            if (error) throw error;

            if (user) {
                return cb(null, user);
            }

            let newUser = new User();
            newUser.email = email;
            newUser.userName = userName;
            newUser.avatarUrl = avatarUrl;
            newUser.googleId = googleId;

            newUser.save(function(error) {
                if (error) throw error;
                return cb(null, newUser);
            });
        });
    } catch (error) {
        return cb(error);
    }
};

export const fromGoogle = passport.authenticate("google", {
    failureRedirect: routes.login,
    successRedirect: routes.me
});

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user._id, {
            userName: name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    } catch (err) {
        console.log(err);
        res.redirect(routes.editProfile);
    }
};
