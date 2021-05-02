const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const contactUs = new Schema({
    nama: {
        type: String
    },
    emailAddress: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    company: {
        type: String
    },
    message: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('contact-us', contactUs)