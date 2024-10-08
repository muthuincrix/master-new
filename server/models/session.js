const mongoose = require("mongoose");


const Schema = mongoose.Schema(
    {},
    {strict:false }
);

module.exports = mongoose.model("sessions", Schema);
