const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
//const Review = require("./models/review.js");
const Review = require("./models/review.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const listings = require("./routes/listings.js")
const reviews = require("./routes/reviews.js")

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
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "public")))

app.listen(8080, () => {
    console.log("Server Listening on 8080")
})

app.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({})

    res.render("listings/index.ejs", { allListings })

}));





app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)





app.all("*", (req, res, next) => {
    next(new ExpressError(404, "PageNot Found"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/errors.ejs", { err });
});


