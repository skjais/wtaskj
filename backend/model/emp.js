const mongoose = require("mongoose");

let Employee = mongoose.model("Employee", {
    id: {type: Number},
    name: {type: String},
    remarks: {type: String}
});

module.exports = {Employee};