const mongoose = require('mongoose');

const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} `;
const tranSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    from: {
        type: Number,
    },
    to: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    Date: {
        type: String,
    }
});

module.exports = mongoose.model('Transaction', tranSchema);