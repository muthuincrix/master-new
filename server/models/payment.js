const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const Schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  userID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  date:{
    type: String,
    required: true,
  },
  planMonth:{
    type: String,
    required: true,
  },
  validDate:{
    type: String,
 
  },
  city:{
    type:String,
  },
  address:{
    type:String,
  },
  state:{
    type:String,
  },
  pincode:{
    type:String,
  },

  validTime:{
    type: String,

  },
  time:{
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
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

module.exports = mongoose.model("payment", Schema);
