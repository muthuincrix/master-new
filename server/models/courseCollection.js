const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  type:{
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  topic:[
    // {
    //   title:{
    //     type: String,
    //     required: true,
    //   },
    //   level:{
    //     easy:{
    //       type: Number,
    //     },
    //     medium:{
    //       type: Number,
    //     },
    //     hard:{
    //       type: Number,
    //     },
    //   },
    // },
  ],
  courseCollectionID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("course-collection", Schema);
