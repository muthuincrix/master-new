const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const questionBank = require('../../../models/questionBank')
exports.deleteBatchTopic = async(req,res,next) =>{
    try {
        const batch = await Batch.findOne({_id:req.body.id})
        if(batch){
            const get = batch.scheduleTest.filter(task => task.quesID.valueOf() !== req.body.deleteID.valueOf())
           
          
            batch.scheduleTest = get
            await batch.save()
            res.json({status:'success',message:'Topic delete successfully'})
        }
    } catch (error) {
        throw error
    }
}

exports.deleteExam = async (req,res) => {
    try {
  const {examID,batchID} = req.body
        const batch = await Batch.findOne({_id:batchID})
        if(batch) {
            batch.scheduleTest = [...batch.scheduleTest.filter(task => task.examID.valueOf() !== examID )]
            batch.save()
            res.json({status :'success',message:'Delete Exam Successfully'})
        }
        else res.status(404).send("Oh uh, something went wrong");
    } catch (error) {
        throw error
    }
}