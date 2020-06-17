const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/wta", (err) => {
    if (!err) {
        console.log("Connection to DB successful.")
    } else {
        console.log("Connection to DB failed.")
    }
});

module.exports = mongoose;