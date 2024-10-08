const ExcelJS = require("exceljs");
const Batch = require("../../../models/batch.js");
const {
  unSubmit,
  sendDateStudent,
} = require("../../../util/unSubmittedExam.js");
const Exam = require("../../../models/exam.js");
const User = require("../../../models/user.js");
const QuestionCollection = require("../../../models/questionCollection.js");
exports.downloadList = async (req, res) => {
  try {
    const { batchid, examid } = req.headers;
    await unSubmit(examid);
    const examInfo = await Exam.findOne({ _id: examid });
    let getExamBatch = await Batch.findOne(
      {
        _id: batchid,
      },
      {
        scheduleTest: {
          $elemMatch: { examID: examid },
        },
      }
    );
    let batch;
    let getBatchList = [];
    let list = getExamBatch.scheduleTest;
    console.log(
      examInfo.studentsPerformance.length,
      list[0].studentPerformance.length
    );
    if (
      examInfo.studentsPerformance.length !== list[0].studentPerformance.length
    ) {
      batch = await Batch.findOne({ _id: batchid });
      const isCheckStudent = [];
      for (let i = 0; i < list[0].studentPerformance.length; i++) {
        isCheckStudent.push(list[0].studentPerformance[i].email);
      }
      for (let i = 0; i < examInfo.studentsPerformance.length; i++) {
        getBatchList = await sendDateStudent(
          batch,
          isCheckStudent,
          examInfo.studentsPerformance[i].mark,
          examInfo.negativeMark,
          examInfo.studentsPerformance[i].id,
          examInfo._id
        );
      }
    }
    getBatchList.length > 0
      ? (list = getBatchList.scheduleTest.filter(
          (task) => task.examID.valueOf() == examid.valueOf()
        ))
      : (list = getExamBatch.scheduleTest.filter(
          (task) => task.examID.valueOf() == examid.valueOf()
        ));
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
    const columns = [
      { header: "Name", key: "name", width: 50 },
      { header: "Roll Number", key: "roll", width: 20 },
      { header: "Department", key: "dept", width: 10 },
      { header: "Email", key: "email", width: 50 },
      { header: "Mark", key: "mark", width: 10 }
    ];
    for(let i=0;i<examInfo.actualAnswerList.length;i++){
      columns.push({header: i+1, key:i+1, width: 10 })
    }
    worksheet.columns = columns
    list[0].studentPerformance.map((task, index) => {
      console.log(task);
      worksheet.addRow({
        name: task.name,
        roll: task.rollNumber,
        dept: task.dept,
        email: task.email,
        mark: task.mark,
      });
    });
    const ansWer = ['A','B','C','D','E','F','G','H']
    examInfo.studentsPerformance.map((task,index) => {
      let row = 2+index
       task.studentAnswerList.map((task,index) => {
        const cell = worksheet.getCell(row,5+index+1); // Add 1 because column indexes start from 1
        if(task !== null)
      {  cell.value = ansWer[task]}
      else if(task == null) cell.value = ''
      else {
        cell.value = task
      }
       })
    })
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=example.xlsx");
    res.setHeader("filename", `${list[0].name}.xlsx`);
    workbook.xlsx.write(res).then(function () {
      res.end();
    });
  } catch (error) {
    throw error;
  }
};

exports.examDownload = async (req, res) => {
  const path = req.path;
  const emamID = path.split("/")[2];
  const examInfo = await Exam.findOne({ _id: emamID });
  try {
    if (examInfo) {
      const getQuestions = [];
      for (let i = 0; i < examInfo.questionCategory.length; i++) {
        for (
          let j = 0;
          j < examInfo.questionCategory[i].questionList.length;
          j++
        ) {
          const questionCollection = await QuestionCollection.findOne({
            _id: examInfo.questionCategory[i].questionList[j].id,
          });
          if (questionCollection) {
            getQuestions.push({
              title: questionCollection.title,
              options: questionCollection.options,
              quesImage:questionCollection.imageUrl,
              explanation:questionCollection.explanation,
              explanatinImageUrl:questionCollection.explanatinImageUrl
            });
          }
        }
      }
      return res.json({ questions: getQuestions });
    }
    return res.status(404);
  } catch (error) {
    throw error;
  }
};




// fillter function
// const getEmail = []
// const getIndex = []
// list[0].studentPerformance.map((task,index) =>{
//   if(getEmail.includes(task.email) == false){
//     getEmail.push(task.email)
//   }else{
//     console.log(task.email);
//     getIndex.push(index)
//   }
// })
//   list[0].studentPerformance = [...list[0].studentPerformance.filter((task,index) =>  getIndex.indexOf(index) == -1 )]
//   getExamBatch.scheduleTest.studentPerformance = list[0].studentPerformance
//    getExamBatch.save()

///delete unnecessary user batch and institutionID

// const batch = await Batch.findOne({_id:'6582b1328c1cbe5950ca24bc'})
// const allUser = await User.find({
//          "batchID":
//           "6582b1328c1cbe5950ca24bc"

// })
// console.log(allUser.length);
// if(batch){
//   const getStudentEmail = []
//   const getStudentRollNumber = []
//   const getStudentDept = []
//   batch.scheduleTest.map(task =>{
//     if(task.studentPerformance.length > 0){
//       task.studentPerformance.map(task => {
//          if(getStudentEmail.indexOf(task.email) == -1)
//       {
// getStudentEmail.push(task.email)
// getStudentRollNumber.push(task.rollNumber)
// getStudentDept.push(task.dept)
//       }

//       })
//     }
//   })

//   for(let i=0;i<allUser.length;i++){
//     if(getStudentEmail.indexOf(allUser[i].email) == -1){
//       allUser[i].institutionID = undefined
//       allUser[i].batchID = []
//       //allUser[i].save()
//     }
//   }

//   const getUserData = []
//  for(let i=0;i<getStudentEmail.length;i++){
//   const user = await User.findOne({email:getStudentEmail[i]})
//   getUserData.push(user)
//  }
//  for(let i=0;i<getUserData.length;i++){
//   batch.studentList.push(
//     {
//       name:getUserData[i].name,
//       email:getUserData[i].email,
//       avatar:getUserData[i].avatar,
//       userID:getUserData[i]._id,
//       rollNumber:getStudentRollNumber[getStudentEmail.indexOf(getUserData[i].email)],
//       dept:getStudentDept[getStudentEmail.indexOf(getUserData[i].email)],
//       request:true
//     }
//   )
//  }
// batch.save()
// }
