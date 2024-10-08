const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  batchID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
  },
  type: {
    type: String,
    enum: ["mock", "schedule"],
    required: true,
  },

  mark: {
    type: Number,
    required:true
  },
  rank: {
    type: Number,
  },
},{
  versionKey: false
});

module.exports = mongoose.model("examRank", Schema);
