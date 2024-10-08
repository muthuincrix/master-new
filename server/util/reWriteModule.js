const User = require('../models/user')
const Goal = require('../models/goal')
const Institution = require('../models/institution')
const Batch = require('../models/batch')
const Exam = require('../models/exam')
const Instityution = require('../models/institution')
// exports.clearAvatarAndHistory =  async (req,res)=>{
//     try {
    //     const user = await User.find()
    //     if(user){
    //         for(let i=0;i<user.length;i++) {
    //             if(user[i].type !== 'institution') user[i].avatar = ''
    //             else if(user[i].type == 'institution') user[i].avatar = 'institutionImage'
    //             user[i].batchID = []
    //             if(user[i].type =='student' || user[i].type =='teacher') 
    //             {
    //                  user[i].institutionID = undefined
    //             }
    //             if(user[i].goal.length > 0){
    //                 for(let j=0;j<user[i].goal.length;j++)
    //                 {
    //                     await clearGoalHistory(user[i].goal[j])
    //                 }
    //             }
    //             user[i].save()
    //         }
    //   const batch = await Batch.find()
    //   if(batch.length > 0){
    //     for(let i=0;i<batch.length;i++) {
    //         batch[i].studentList  = []
    //         batch[i].scheduleTest = []
    //         batch[i].save()
    //     }
    //   }

    //  const institution = await Instityution.find()
    //  if(institution){
    //     for(let i=0;i<institution.length;i++){
    //         institution[i].teacherList=[]
    //         institution[i].save()
    //     }
    //  }


//             res.send('success')
//         // }
//     } catch (error) {
//         throw error
//     }
// }

async function clearAvatarAndHistory (id){
    try {
        const goal = await Goal.findOne({_id:id})
        if(goal){
            goal.examHistory = []
            goal.mockCount = 0
            goal.practicesCount = 0
            await goal.save()
        }
    } catch (error) {
        throw error
    }
}


exports.clearAvatarAndHistory = async(req,res)=>{
    try {
        // const batch = await Batch.findOne({_id:'6582b1328c1cbe5950ca24bc'})
        // console.log(batch.scheduleTest[1]);
        const exam = await Exam.findOne({_id:'658e4d606b52b4b0787b0eff'})
        const count = exam.studentsPerformance.filter((task,index) => {
            if(task.status == 'submitted') return index
            
    })
    console.log(count.length);
res.send('success')
    } catch (error) {
        throw error
    }
}