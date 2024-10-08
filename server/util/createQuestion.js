const Collections = require("../models/questionCollection");

exports.createPracticeExamQues = async (
  bankID,
  collectQuestion,
  finalQuestion
) => {
  try {
 
    // const collection = await Collections.find();

    // const getCollection = collection.filter(
    //   (task) => bankID.indexOf(task.QuesbankID.valueOf()) !== -1
    // );

    let getCollection = []
    for(let i=0;i<bankID.length;i++){
      const getQuesBankCollection = await Collections.find({QuesbankID:bankID[i]})
      for(let j=0;j<getQuesBankCollection.length;j++){
        getCollection.push(getQuesBankCollection[j])
      }
    } 

    getCollection.map((task) => {
      if (bankID.indexOf(task.QuesbankID.valueOf()) !== -1) {
       
        if (task.level == "Easy")
          collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].easy.push(
            task._id
          );
        if (task.level == "Medium")
          collectQuestion[
            bankID.indexOf(task.QuesbankID.valueOf())
          ].medium.push(task._id);
        if (task.level == "Hard")
          collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].hard.push(
            task._id
          );
      }
    });

    
  
    collectQuestion.map((task, quesIndex) => {
      if (task.easy.length > 0 || task.requireEasy > 0) {
        const index = [];
        for (let i = 0; i < task.requireEasy; ) {
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          }
          const random = getRandomInt(0, task.easy.length -1);
         
          if (index.indexOf(random) == -1) {
           
            finalQuestion[quesIndex].questions.push({ id: task.easy[random] });
            index.push(random);
            i++;
          }
        }
      }
      if (task.medium.length > 0 || task.requireMedium > 0) {
        const index = [];
        for (let i = 0; i < task.requireMedium; ) {
          function getRandomInt(min, max) {
            // min = Math.ceil(min);
            // max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
          }
          const random = getRandomInt(0,task.medium.length -1);
       
          if (index.indexOf(random) == -1) {
          
            finalQuestion[quesIndex].questions.push({
              id: task.medium[random],
            });
            index.push(random);
            i++;
          } else {
           
          }
        }
      }
      if (task.hard.length > 0 || task.requireHard > 0) {
        const index = [];
        for (let i = 0; i < task.requireHard; ) {
          function getRandomInt(min, max) {
            // min = Math.ceil(min);
            // max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
          }
          const random = getRandomInt(0, task.hard.length -1 );
        
          if (index.indexOf(random) == -1) {
           
            finalQuestion[quesIndex].questions.push({ id: task.hard[random] });
            index.push(random);
            i++;
          }
        }
      }
    });
    return finalQuestion;
  } catch (error) {
    throw error
  }
};
exports.createMockExamQues = async (bankID, collectQuestion, finalQuestion) => {
  try {
   
    // const collection = await Collections.find();

    // const getCollection = collection.filter(
    //   (task) => bankID.indexOf(task.QuesbankID.valueOf()) !== -1
    // );
    let getCollection = []
    for(let i=0;i<bankID.length;i++){
      const getQuesBankCollection = await Collections.find({QuesbankID:bankID[i]})
      for(let j=0;j<getQuesBankCollection.length;j++){
        getCollection.push(getQuesBankCollection[j])
      }
    } 
    getCollection.map((task) => {
      if (bankID.indexOf(task.QuesbankID.valueOf()) !== -1) {
        if (task.level == "Easy")
          collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].easy.push(
            task._id
          );
        if (task.level == "Medium")
          collectQuestion[
            bankID.indexOf(task.QuesbankID.valueOf())
          ].medium.push(task._id);
        if (task.level == "Hard")
          collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].hard.push(
            task._id
          );
      }
    });
    collectQuestion.map((task, quesIndex) => {
      if (task.easy.length > 0 || task.requireEasy > 0) {
        const index = [];
        for (let i = 0; i < task.requireEasy; ) {
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          }
          const random = getRandomInt(0, task.easy.length  );

          if (index.indexOf(random) == -1) {
          
            finalQuestion[quesIndex].questions.push({ id: task.easy[random] });
            index.push(random);
            i++;
          } 
        }

      }
      if (task.medium.length > 0 || task.requireMedium > 0) {
        const index = [];
        for (let i = 0; i < task.requireMedium; ) {
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          }
          const random = getRandomInt(0, task.medium.length  );

          if (index.indexOf(random) == -1) {
            console.log("not match ", random);
            finalQuestion[quesIndex].questions.push({
              id: task.medium[random],
            });
            index.push(random);
            i++;
          } 
        }
      }
      if (task.hard.length > 0 || task.requireHard > 0) {
        const index = [];
        for (let i = 0; i < task.requireHard; ) {
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          }
          const random = getRandomInt(0,task.hard.length  )

          if (index.indexOf(random) == -1) {
            console.log("not match ", random);
            finalQuestion[quesIndex].questions.push({ id: task.hard[random] });
            index.push(random);
            i++;
          }
        }
      }
    });
    return finalQuestion;
  } catch (error) {
    throw error
  }
};
