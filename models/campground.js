const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const { cloudinary } = require('../cloudinary');

const ImageSchema = new Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = { toJSON: { virtuals: true } };

const campgroundsSchema = new Schema({
    title: {
        type: String
    },
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

campgroundsSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
})

campgroundsSchema.post('findOneAndDelete', async function (doc) {
    if (doc.reviews) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
    if (doc.images) {
        for (const img of doc.images) {
            await cloudinary.uploader.destroy(img.filename);
        }
    }
})

module.exports = mongoose.model('Campground', campgroundsSchema);