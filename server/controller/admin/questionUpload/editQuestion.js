const questionCollection = require("../.././../models/questionCollection");

exports.EditQuestions = async (body) => {

  try {
    let check = await questionCollection.findOne({ _id: body.questionID });
  if (check) {
    check.title = body.title;
    check.options = body.options;
    check.level = body.level;
    check.type = body.type;
    check.answer = body.answer;
    check.explanation = body.explanation;
    check.imageUrl = body.imageUrl;
    check.explanatinImageUrl = body.explanatinImageUrl
    check.explanationLink = body.explanationLink
    check.QuesbankID = body.questionBankId;
    check.updatedAt = new Date()

    await check.save();

    return { status: "success", message: "Question updated successfully ID : " + check._id };
  } else {
    return { status: "error", message: "Something went wrong" };
  }
  } catch (error) {
    throw error
  }

};

exports.SearchQuestion = async (body) => {
  try {
    const check = await questionCollection.find({
      $or: [
        {
          QuesbankID:body.quesID,
          title: { $regex: body.title,
            $options: "i"
          },
        
        },
      ],
    })
 
  if (check.length > 0) {
    return check;
  } else {
    return { status:'info', message: "Question is not Found" };
  }
  return []
  } catch (error) {
    throw error
  }

};


