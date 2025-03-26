const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default:"https://unsplash.com/photos/a-beach-with-waves-and-mountains-in-the-background-P72N1EjOQOw",
        set:(v) => v==="" ? "https://unsplash.com/photos/a-beach-with-waves-and-mountains-in-the-background-P72N1EjOQOw":v
    },
    price:Number,
    location:String,
    country:String
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;