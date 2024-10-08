const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    plan: {
      type: String,
      required: true,
      default: "free",
      enum: ["free", "standard", "pro"],
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
    practicesCount: {
      type: Number,
      default: 0,
    },
    mockCount: {
      type: Number,
      default: 0,
    },
    planMonth: {
      type: Number,
    },

    planValidDate: {
      type: String,
    },
    planValidTime: {
      type: String,
    },
    examHistory: [
      {
        examId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "exam",
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ["schedule", "mock", "practice"],
        },
        examName: {
          type: String,
          required: true,
        },
        topics: [
          {
            topicName: {
              type: String,
              required: true,
            },
            accuracy: {
              type: Number,
              required: true,
            },
            totalQuestion: {
              type: Number,
              required: true,
            },
            correctQuestion: {
              type: Number,
              required: true,
            },
            wrongQuestion: {
              type: Number,
              required: true,
            },
          },
        ],
        score: {
          type: Number,
          required: true,
        },
        totalMarks: {
          type: Number,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
      },
    ],
    topics: [
      {
        topicName: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          require: true,
        },
        bankID: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question-bank",
            required: true,
          },
        ],
        topicID: {
          type: String,
          require: true,
        },

        questionAttempted: {
          type: Number,
          required: true,
          default: 0,
        },
        questionCorrect: {
          type: Number,
          required: true,
          default: 0,
        },
        questionWrong: {
          type: Number,
          required: true,
          default: 0,
        },
        questionSkipped: {
          type: Number,
          required: true,
          default: 0,
        },
        questionTotal: {
          type: Number,
          required: true,
          default: 0,
        },
        accuracy: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("goal", goalSchema);

// const { Schema, model, default: mongoose } = require("mongoose");

// const goalSchema = new Schema(
//   {
//     courseName: {
//       type: String,
//       required: true,
//     },
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "course",
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//     plan: {
//       type: String,
//       required: true,
//       default: "free",
//       enum: ["free", "standard", "pro"],
//     },
//     status: {
//       type: String,
//       required: true,
//       default: "active",
//       enum: ["active", "inactive"],
//     },
//     examHistory: [
//       {
//         examId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "exam",
//           required: true,
//         },
//         examName: {
//           type: String,
//           required: true,
//         },
//         score: {
//           type: Number,
//           required: true,
//         },
//         totalMarks: {
//           type: Number,
//           required: true,
//         },
//         date: {
//           type: Date,
//           required: true,
//         },
//       },
//     ],
//     topics: [
//       {
//         topicName: {
//           type: String,
//           required: true,
//         },

//         questionAttempted: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//         questionCorrect: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//         questionWrong: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//         questionSkipped: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//         questionTotal: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//         accuracy: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Goal = model("goal", goalSchema);
