
const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    totalQuestions:{
        type: Number,
        required: true,
        default: 0
    },
    level:{
        easy:{
          type: Number,
          default: 0
        },
        medium:{
          type: Number,
          default: 0
        },
        hard:{
          type: Number,
          default: 0
        },
      },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("question-bank", Schema);