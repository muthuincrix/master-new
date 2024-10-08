const Course = require("../../../models/course.js");
exports.deleteCourseCollection = async (req, res, next) => {
  const Delete = await Course.findOne({ _id: req.body.courseID });
  if (Delete) {
    const get = Delete.collections.filter(
      (task) => task._id == req.body.collectionsID
    );
   if(get.length !==0) {
    const get2 = Delete.collections.filter(
      (task) => task.id !== req.body.collectionsID
    );

    if (get[0].topic.length !== 1) {
      const groupTopic = get[0].topic.filter(
        (task) => task.title !== req.body.title
      )
      
      get[0].topic = [];
      groupTopic.map((task) => get[0].topic.push(task));
      Delete.collections = [];
      get.map((task) => Delete.collections.push(task));
      get2.map((task) => Delete.collections.push(task));
      await Delete.save();

      res.json({
        status: "success",
        message: "Group topic deleted successfully",
      });
    } else {
      Delete.collections = [];
      get2.map((task) => Delete.collections.push(task));
      await Delete.save();
      res.json({ status: "success", message: "Topic deleted successfully" });
    }
  }
}
};


exports.deleteGroupCourseCollection = async (req,res,next) =>{
  const Delete = await Course.findOne({ _id: req.body.courseID });
  if(Delete){
   
  const get = Delete.collections.filter(task => task.title !== req.body.title)
  Delete.collections=[]
  Delete.collections=get
  await Delete.save()
  res.json({ status: "success", message: "Deleted Group successfully" });
  }
  else{
    res.json({ status: "error", message: "Something Wrong" })
  }
}