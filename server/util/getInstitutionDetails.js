
const Batch = require("../models/batch.js");
const Institution = require("../models/institution.js");
const {examEndTime,getExamValid} = require('./time.js')
exports.getInstitutionDetails = async (institutionID, batchs) => {
  try {
    const collectBatch = [];
    const institute = await Institution.findOne({ _id: institutionID });
    for (let i = 0; i < batchs.length; i++) {
      const scheduleTest = [];
      const batch = await Batch.findOne({ institutionID, _id: batchs[i] });

      for(let i=0 ;i<batch.scheduleTest.length ;i++){
      const isValue = await isValidExamEnd(batch.scheduleTest[i]);
      if (batch.scheduleTest[i].status == "pending" && !isValue) scheduleTest.push({ name: batch.scheduleTest[i].name, examID: batch.scheduleTest[i].examID });
      }
      collectBatch.push({
        batchName: batch.name,
        scheduleTest,
      });      
    }
    return {
        name:institute.name,
        avatar:institute.avatar,
        collectBatch,
    }
  } catch (error) {
    throw error
  }
};

const isValidExamEnd = async function (examInfo) {

  const End = getExamValid(examInfo.examDate,examInfo.examEndTime)

  return End

};
