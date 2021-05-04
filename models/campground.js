const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundsSchema = new Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('Campground', campgroundsSchema);