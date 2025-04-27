const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function mongoConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("db connected!");
    }
    catch (err) {
        console.log("error while connecting db :", err);
    }
}

module.exports = mongoConnect;