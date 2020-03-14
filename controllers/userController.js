export const join = (req, res) => res.render("join", {pageTitle: "Join"});
export const login = (req, res) => {
    console.log(req.body);
    res.render("login", {pageTitle: "Login", userName: req.body.name});
};
export const logout = (req, res) => res.render("logout", {pageTitle: "Log out"});
export const users = (req, res) => res.render("users", {pageTitle: "Users"});
export const userDetails = (req, res) => res.render("userDetails", {pageTitle: "User Details"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle: "Change Password"});