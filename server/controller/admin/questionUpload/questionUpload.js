const { createCollection, createBank } = require("./createBank");
const questionCollection = require("../../../models/questionCollection.js");
const questionBank = require("../../../models/questionBank.js");
const { EditQuestions, SearchQuestion } = require("./editQuestion");

/// Get

exports.getBank = async (req, res, next) => {

  try {
    const createBank = await questionBank.find();
    if (createBank) {
      res.json({
        status:'ok',
        message: createBank,
      });
    } else {
      res.json({ 
        status:'not ok',
        message: "Page Not Found" 
     });
    }
  } catch (error) {
    throw error
  }
 
};


exports.getBankName = async (req,res,next) =>{
  try {
    const get = await questionBank.findOne({_id:req.body.id})
    res.json(get)
  } catch (error) {
    throw error
  }

}

exports.Get = async (req, res, next) => {

  try {
    const check = await questionCollection.find({ QuesbankID: req.body.bankID });
    if (check) {
      res.json({
        status: "success",
        message: check,
      });
    }
    return { message: "not found" };
  } catch (error) {
    throw error
  }

};

/// post
exports.createQuestionBank = async (req, res, next) => {

  try {
    const data = await createBank(req.body);
    res.json(data);
  } catch (error) {
    throw error
  }

};

exports.createQues = async (req, res, next) => {
  try {
    const data = await createCollection(req.body);
    res.json(data);
  } catch (error) {
    throw error
  }

};

exports.editQuestion = async (req, res, next) => {
  try {
    const editData = await EditQuestions(req.body);

    res.json(editData);
  } catch (error) {
    throw error
  }

};

exports.searchQues = async (req, res, next) => {
  try {
    const get = await SearchQuestion(req.body);

    res.json(get);
  } catch (error) {
    throw error
  }

};

exports.deleteQues = async (req,res,next) =>{
  try {
    const Delete = await questionCollection.deleteOne({_id:req.body.id})
    if(Delete) {
      const count = await questionBank.findOne({_id:req.body.bankID})
      // --count.level["medium"]
      count.totalQuestions = count.totalQuestions-1
      if(req.body.level == 'Easy') count.level.easy = count.level.easy-1
      if(req.body.level == 'Medium') count.level.medium = count.level.medium-1
      if(req.body.level == 'Hard') count.level.hard = count.level.hard-1
      await count.save()
      res.json({status:'success',message:'Question Deleted Successfully ID : '+req.body.id})
    }
    else{
      res.json({status:'error',message:'Something went wrong'})
    }
  } catch (error) {
    throw error
  }
}

