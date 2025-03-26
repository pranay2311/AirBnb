const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then((res)=>{
    console.log("Connected to DB");
})

app.listen(8080, () => {
    console.log("Server Listening on 8080")
})

app.get("/", (req, res) => {
    res.send("Root ")
})

app.get("/test", async (req,res)=>{
    let sampleListing = new Listing({
        title:"My New Villa",
        description:"By the Beach",
        price:1200,
        location:"Goa",
        country:"India"

    });
    await sampleListing.save();
    console.log("Saved Successfully")
    res.send("Successful Testing")
})