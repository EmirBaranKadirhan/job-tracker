const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,           // user modeline referans i buradan verecegiz
        ref: "User",
        required: true
    },

    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Cv Gonderildi", "Red", "Mulakat"],
        default: "Cv Gonderildi"
    },
    notes: {
        type: String,
        default: ""
    }

}, { timestamps: true });

const Jobs = mongoose.model('Job', jobsSchema)

module.exports = Jobs