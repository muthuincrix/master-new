const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["publish", "draft"],
    default: "draft",
    },
  totalTopic: {
    type: Number,
    default: 0,
  },
  collections: [
    {
      type: {
        type: String,
        required: true,
        enum: ["group", "topic"],
      },
      title: {
        type: String,
        require:true
      },
      topicID:{
      type:String
      },
      topic: [
        {
          title: {
            type: String,
            required: true,
          },
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question-banks",
            required: true,
          },
          level: {
            easy: {
              type: String,
              default:'0'
            },
            medium: {
              type: String,
              default:'0'
            },
            hard: {
              type: String,
              default:'0'
            },
          },
        },
      ],
    },
  ],
  mockUpdate:{
    type:Boolean,
    default:false
  },
  mark: {
    type: Number,
    default:0
  },
  negativeMark: {
    type: Number,
    default:0
  },
  duration: {
    type: Number,
    default:0
  },
  Payment:[{
   month:{
    type:Number,
     required: true,
  
   },
   amount:{
    type:Number,
     required: true,
   },
   discount:{
  type:Number,
   required: true,
   }
  }],
  lowPercentage:{
type:Array,
default:[0,0]
  },
  mediumPercentage:{
    type:Array,
    default:[0,0]
      },
      highPercentage:{
        type:Array,
        default:[0,0]
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

module.exports = mongoose.model("course", Schema);