const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const {saveRedirectedUrl} = require("../middleware.js")



router.get("/signup", (req, res) => {
    res.render("users/signup.ejs")
})

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, ((err) => {
            if (err) {
                return next();
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        }));
    } catch (e) {
        console.log(e.message)
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}))

router.get("/login", (req, res) => {
    res.render("users/login.ejs")
})

router.post(
    "/login",
    saveRedirectedUrl,
    passport.authenticate(
        "local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
    async (req, res) => {
        req.flash("success", "Welcome Back!");
        let url = res.locals.redirectUrl || "/listings"
        res.redirect(url);


    })

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Logged Out Now")
        res.redirect("/listings")
    })
})
module.exports = router