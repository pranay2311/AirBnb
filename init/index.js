const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then((res) => {
    console.log("Connected to DB");
})

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "69498183e493223d6f7a1629" }));
    await Listing.insertMany(initData.data);
    console.log("DAta SAVE");
    console.log(initData.data);
}

initDB()