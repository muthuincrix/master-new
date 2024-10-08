const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  avatar: {
    type: String,
  },
  teacherList: [
    {
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      batchList: [
        {
          batchName:{
            type: String,
          },
          batchID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "batch",
            required: true,
          },
        },
      ],
      email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!isEmail(value)) {
            throw new Error("Email is invalid");
          }
        },
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  batch: [
    {
      name: {
        type: String,
      },
      batchID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("institution", Schema);
