const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
const path = require("path")
const methodOverride = require("method-override")

async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then((res) => {
    console.log("Connected to DB");
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))


app.listen(8080, () => {
    console.log("Server Listening on 8080")
})

app.get("/", (req, res) => {
    res.send("Root ")
})

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({})

    res.render("listings/index.ejs", { allListings })

})

//NEW Route

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

//Post New Route
app.post("/listings", async (req, res) => {
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    await newListing.save();
    console.log(listing)
    res.redirect("/listings")
})


//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})

//Update Listing
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   
    res.redirect(`/listings/${id}`)
})

//DELETE Listing
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);

    res.redirect("/listings")
})

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})

