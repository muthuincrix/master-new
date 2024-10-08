const { Schema, model} = require('mongoose');

const examSchema = new Schema({
    type:{
        type: String,
        required: true,
        enum: ['schedule', 'mock', 'practice']
    },
    batchID:{
        type: Schema.Types.ObjectId,
                ref: 'batch',

    },
    title:{
        type: String,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    examDate:{
        type: String,
        required: true
    },
    examStartTime:{
        type: String,
    },
    examEndTime:{
        type: String,
    },
    examDuration:{
        type: String,
        required: true
    },
    mark:{
        type: Number,
        required: true
    },
    negativeMark:{
        type: Number,
        required: true
    },
    totalQuestion:{
        type: Number,
    },
    questionCategory:[
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'questionBank',
                required: true
            },
           
            title:{
                type: String,
                required: true
            },
            questionList:[
                {
                    id:{
                        type: Schema.Types.ObjectId,
                        ref: 'questionsBankCollection',
                        required: true
                    },
                }
            ]
        }
    ],
    actualAnswerList:{
        type: Array,
        default: []
    },
    studentsPerformance:[
        {
            _id:false,
            id:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name:{
                type: String,
                required: true
            },
            startTime:{
                type: String,
                required: true
            },
            endTime:{
                type: Date,
            },
            studentAnswerList:{
                type: Array,
                default: []
            },
            bookmarkedQuestionList:{
                type: Array,
                default: []
            },
            correctedAnswerList:{
                type: Array,
                default: []
            },
            
            questionAttempted:{
                type: Number,
            },
            mark:{
                type: Number,
                default: 0
            },
            negativeMark:{
                type: Number,
                default: 0
            },
            totalMark:{
                type: Number,
                default: 0
            },
            currentIndex:{
                type:String,
                default:0
            },
            topics:[
                {
                   topicName:{  
                    type:String,
                   },
                   accuracy:{
                    type:Number,
                   }
                
                }
            ],
            windowCloseWarning:{
                type: Number,
                default: 0
            },
            windowResizedWarning:{
                type: Number,
                default: 0
            },
            status:{
                type: String,
                enum: ['notStarted', 'started', 'submitted', "terminated"],
                default: 'notStarted'
            },
        }    
    ],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

module.exports = model('exam', examSchema);