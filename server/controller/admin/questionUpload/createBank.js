const questionCollection = require("../../../models/questionCollection");
const questionBank = require("../../../models/questionBank.js");

exports.createBank = async (body) => {
  const alreadyExist = await questionBank.findOne({ title: body.title });
  if (!alreadyExist) {
    const create = await questionBank({
      title: body.title,
    });
    if (create) {
      await create.save();
      return {
        status: "success",
        message: "Question bank created successfully ID : " + create._id,
      };
    }else{
        return { status: "error", message: "Question bank already available" };
    }
  }
  return { status: "error", message: "the name already taken" };
};

exports.createCollection = async (body) => {
  let answer = "";
  if (body.answer.length !== 0) {
    answer = body.answer[0].option;
  }
  try {
    const check = await questionCollection({
      title: body.title,
      type: body.type,
      level: body.level,
      options: body.options,
      explanation: body.explanation,
      answer: answer,
      imageUrl: body.imageUrl,
      Number: body.Number,
      explanatinImageUrl:body.explanatinImageUrl,
      explanationLink:body.explanationLink,
      QuesbankID: body.questionBankId,
    });

    await check.save();

    const count = await questionBank.findOne({ _id: body.questionBankId})
      
    count.totalQuestions = 1+count.totalQuestions
    if(body.level == 'Easy') count.level.easy = 1+count.level.easy
    if(body.level == 'Medium') count.level.medium = 1+count.level.medium
    if(body.level == 'Hard') count.level.hard = 1+count.level.hard
    await count.save()

    return {
      status: "success",
      message: "Question created successfully ID : " + check._id,
    };
  } catch (error) {
    return { status: "error", message: "Something went wrong" }
  }
};
