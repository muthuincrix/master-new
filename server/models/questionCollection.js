const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ["Multiple Choose", "Number"]
    },
    level:{
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"]
    },
    options:{
        type: Array, 
        default: []
    },
    Number:{
        type: Array,
        default: []
    }
    ,
    explanation:{
        type: String,
      
    },
    explanationLink:{
        type: String,
      
    },
    explanatinImageUrl:{
        type: String,
    },
    imageUrl:{
        type:String
    },
    answer:{
        type: String,
        
    },
    QuesbankID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "question-bank",
        required: true
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

module.exports = mongoose.model("questionsBankCollection", Schema);
