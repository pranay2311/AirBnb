const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");


const sessionOptions={
    secret:"Secret",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOptions));

app.get("/test", (req, res) => {
    res.send("Test")
})

app.get("/register",(req,res)=>{
    let {name = "ND"} = req.query;
    req.session.name = name;
    res.send(name)
})

app.get("/hello",(req,res)=>{
    res.send(`Hello, ${req.session.name}`)
})


app.get("/reqCount",(req,res)=>{
    if(req.session.count){
        req.session.count++
    }
    else{
        req.session.count=1
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