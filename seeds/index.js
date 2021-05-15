const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error'));
db.once("open", () => {
    console.log("Database Connected Successfully");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '609d667322a725644802d0be',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ab nostrum tempore perspiciatis, placeat neque veniam modi rerum perferendis vero nulla aspernatur reprehenderit ipsa officia unde corrupti id laudantium possimus!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dmi3zyqqf/image/upload/v1621014417/YelpCamp/j41iqumjryv0z9iwr1va.png',
                    filename: 'YelpCamp/j41iqumjryv0z9iwr1va'
                },
                {
                    url: 'https://res.cloudinary.com/dmi3zyqqf/image/upload/v1621014420/YelpCamp/jgriaf028mvdyr1jyop2.png',
                    filename: 'YelpCamp/jgriaf028mvdyr1jyop2'
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
    });