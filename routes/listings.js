const express = require("express")
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}



router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({})

    res.render("listings/index.ejs", { allListings })

}));

//NEW Route

router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
})

//Post New Route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {

    let listing = req.body.listing;
    let newListing = new Listing(listing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");

}));


//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

//Update Listing
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`)
}));

//DELETE Listing
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    res.redirect("/listings")
}));

//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");

    res.render("listings/show.ejs", { listing });
}));




module.exports = router;