const express = require("express");
const app = express();
const path = require("path")
const ejsMate = require("ejs-mate");
const flash = require("connect-flash")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")))

const cookieParser = require("cookie-parser");
const session = require("express-session");



const sessionOptions = {
    secret: "Secret",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash())
app.get("/test", (req, res) => {
    res.send("Test")
})

app.get("/register", (req, res) => {
    let { name = " " } = req.query;
    req.session.name = name;
    if (name = " ") {


        req.flash("error", "User not Registered");
    }
    else {
        req.flash("success", "User Registered Successfully");
    }

    //   req.flash("success", "User Registered")
    res.redirect("/hello")
})

app.get("/hello", (req, res) => {
    res.locals.successMsg= req.flash("success");
    res.locals.errorMsg= req.flash("error");
    res.render("page.ejs", { name: req.session.name });
    console.log(req.session)

})





app.get("/reqCount", (req, res) => {
    if (req.session.count) {
        req.session.count++
    }
    else {
        req.session.count = 1
    }
    res.send(`You uSent ${req.session.count} request    `)
})

// app.get("/Cookie", (req, res) => {
//     res.cookie("greet", "Hello");
//     res.cookie("Name", "UserName");
//     res.send("Cookie Sent")
// })

// app.get("/Greet", (req, res) => {
//     let { Name="Pranay" }= req.cookies
//     console.log(req.cookiesf)
//     res.send(`Hii ${Name}`);
// })


app.use(cookieParser())
app.listen(8080, () => {
    console.log("Server Listening on 8080")
})