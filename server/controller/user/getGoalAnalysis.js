const course = require("../../models/course");
const Goal = require("../../models/goal");
const { goalValid } = require("../../util/time.js");
exports.getGoalAnalysis = async (courseID, userID) => {
  try {
    const get = await course.findOne({ _id: courseID });
    const getUserGoal = await Goal.findOne({
      courseId: courseID,
      userId: userID,
    });

    const getTopicID = [];
    const createTopic = [];
    const studentsPerformance = [];

    // get course collection topicID
    get.collections.map((task) => getTopicID.push(task.topicID));

    getUserGoal.topics.map((task) => {
      if (getTopicID.indexOf(task.topicID) !== -1) {
        createTopic.push(task.topicID);
      }
    });

    //create new topic in goal
    const getCheck = [];
    get.collections.map((task) => {
      if (
        createTopic.indexOf(task.topicID) == -1 &&
        getCheck.indexOf(task.topicID) == -1
      ) {
        const getID = [];

        task.topic.map((task) => getID.push(task.id));
        getUserGoal.topics.push({
          type: task.type,
          topicName: task.type == "group" ? task.title : task.topic[0].title,
          topicID: task.topicID,
          bankID: getID,
        });
        getCheck.push(task.topicID);
      }
    });
    const topicName = [];
    const topicAnalysis = [];

    getUserGoal.topics.map((task) => {
      if (getTopicID.indexOf(task.topicID) !== -1) {
        createTopic.push(task.topicID);
        topicName.push(task.topicName);
        topicAnalysis.push(task.accuracy);
      }
    });

    studentsPerformance.push({
      Analysis: {
        topicName,
        topicAnalysis,
      },
    });
    await getUserGoal.save();
    return studentsPerformance;
  } catch (error) {
    throw error
  }
};

exports.checkIsValid = async (req, res) => {
  try {
    const goal = await Goal.find({ userId: req.session.userID });
    if (goal) {
      const check = [];
      for (let i = 0; i < goal.length; i++) {
        if (goal[i].plan !== "free") {
          const get = await goalValid(
            goal[i].planValidDate,
            goal[i].planValidTime
          )
          if (get) {
            check.push(get);
            goal[i].plan = "free";
            goal[i].practicesCount = 0;
            goal[i].mockCount = 0;
            await goal[i].save();
          }
    
        }
      }
      if (check.length > 0) return res.json({ status: true })
      else return res.json({ status: false })
    }
    return res.json({ status: "error", message: "something wrong" });
  } catch (error) {
    throw error;
  }
};
