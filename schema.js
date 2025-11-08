const Joi = require("joi");

// Validation schemas using Joi. These are used in route middleware to
// validate incoming form data and return helpful errors before hitting the DB.
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        // price must be a non-negative number
        price: Joi.number().required().min(0),
        // image can be empty or null (the model provides a default URL)
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        // a review must have a comment and rating between 1 and 5
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required(),
});

