const Institution = require("../../../models/institution");
const User = require("../../../models/user");
const sessions = require("../../../models/session.js");

exports.getInstitution = async (req, res, next) => {
  try {
    let institute = await Institution.findOne({ _id: req.body.id });
    const user = await User.findOne({ _id: req.session.userID });
    const createBatchList = [];
    for (let i = 0; i < institute.batch.length; i++) {
      const studentList = await User.find({
        type: "student",
        batchID: { $in: institute.batch[i].batchID },
      });
      const teacherList = await User.find({
        type: "teacher",
        batchID: { $in: institute.batch[i].batchID },
      });
     
      createBatchList.push({
        batchID: institute.batch[i].batchID,
        name: institute.batch[i].name,
        _id: institute.batch[i]._id,
        studentList: studentList.length,
        teacherList: teacherList.length,
      });

    }
    if (req.session.userRoll == "teacher") {
      const check = [];
      user.batchID.map((task) => check.push(task.valueOf()));
      const get = institute.batch.filter(
        (task) => check.indexOf(task.batchID.valueOf()) !== -1
      );
      institute.batch = get;
      institute.teacherList = [];
    }
  
    if (institute) res.json({ status: "success", message: institute,createBatchList});
    else res.json({ status: "error", message: "something wrong" });
  } catch (error) {
    throw error;
  }
};

exports.getInstituteName = async (req, res, next) => {
  try {
    const data = [];
    const institute = await Institution.find();
    if (institute) {
      institute.map((task) => data.push({ label: task.name, id: task._id }));
      res.json({ status: "ok", message: data });
    }
  } catch (error) {
    throw error;
  }
};

exports.getTeacher = async (req, res, next) => {
  try {
    const user = await User.find({ type: "student" });
    if (user) {
      const send = [];
      user.map((task) => {
        if (task.type == "student")
          send.push({ label: task.email, id: task._id });
      });
      res.json({ status: "ok", message: send });
    }
  } catch (error) {}
};

exports.createTeacher = async (req, res, next) => {
  const { id, teacherName } = req.body;
  try {
    const institute = await Institution.findOne({ _id: id });
    if (institute) {
      const user = await User.findOne({ _id: teacherName.id });
      if (user) {
        const check = [];
        institute.teacherList.map((task) => {
          if (user._id.valueOf() == task.id.valueOf()) check.push(task);
        });
        if (check.length == 0) {
          institute.teacherList.push({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            id: user._id,
          });
          await institute.save();
          user.institutionID = institute._id;
          user.type = "teacher";
          user.batchID = [];
          await user.save();

          // Delete session
          const getSession = await sessions.find();
          const getVerify = await isLogin(getSession, user.email);
          if (getVerify.length > 0) {
            await sessions
              .deleteMany({
                expires: getVerify[0].expires,
              })
              .then(function () {
                console.log("Data deleted"); //  Success
              })
              .catch(function (error) {
                console.log(error); // Failure
              });
          }

          res.json({ status: "success", message: "Add teacher successfully" });
        } else
          res.json({
            status: "already",
            message: "The teacher name is already exists",
          });
      } else res.json({ status: "error", message: "something wrong" });
    } else res.json({ status: "error", message: "something wrong" });
  } catch (error) {
    res.json({ status: "error", message: "something wrong" });
  }
};

exports.addTeacherBatch = async (req, res, next) => {
  const { id, teacherName, teacherID } = req.body;

  try {
    const user = await User.findOne({ _id: teacherID });

    const institute = await Institution.findOne({ _id: id });
    if (institute) {
      const check = [];

      institute.teacherList.map((task) => {
        const get = task.batchList.filter(
          (task) => task.batchID == teacherName.batchID
        );

        if (get.length == 0) {
          if (user.name == task.name) {
            check.push(task);
            task.batchList.push({
              batchName: teacherName.label,
              batchID: teacherName.batchID,
            });
          }
        }
      });
      if (check.length !== 0) {
        user.batchID.push(teacherName.batchID);
        await institute.save();
        await user.save();
        res.json({ status: "success", message: "Add batch successfully" });
      } else if (check.length == 0)
        res.json({ status: "already", message: "batch already exists" });
    }
  } catch (error) {}
};

exports.editTeacherAction = async (req, res, next) => {
  const { type, data, id } = req.body;
  const { teacher, removeBatch } = data;

  try {
    const user = await User.findOne({ _id: teacher.id });

    const institute = await Institution.findOne({ _id: id });
    if (institute) {
      institute.teacherList.map((task) => {
        const get = task.batchList.filter(
          (task) => task.batchID.valueOf() !== removeBatch.batchID.valueOf()
        );

        task.batchList = get;
      });

      await institute.save();
      const get = user.batchID.filter(
        (task) => task.valueOf() !== removeBatch.batchID.valueOf()
      );

      user.batchID = get;
      await user.save();

      res.json({ status: "success", message: "Remove batch successfully" });
    } else res.json({ status: "error", message: "Something wrong" });
  } catch (error) {
    res.json({ status: "error", message: "Something wrong" });
  }
};

exports.removeTeacher = async (req, res, next) => {
  const { id, data } = req.body;
  try {
    const user = await User.findOne({ _id: data.id });

    const institute = await Institution.findOne({ _id: id });
    if (institute) {
      const collectBatch = [];
      institute.teacherList.map((task) =>
        task.batchList.map((task) => collectBatch.push(task.batchID.valueOf()))
      );
      const get = institute.teacherList.filter(
        (task) => task.id.valueOf() !== data.id.valueOf()
      );
      institute.teacherList = get;
      await institute.save();
      const getUserID = user.batchID.filter(
        (task) => collectBatch.indexOf(task.valueOf()) == -1
      );

      // Delete session

      const getSession = await sessions.find();
      const getVerify = await isLogin(getSession, user.email);
      if (getVerify.length > 0) {
        await sessions
          .deleteMany({
            expires: getVerify[0].expires,
          })
          .then(function () {
            console.log("Data deleted"); //  Success
          })
          .catch(function (error) {
            console.log(error); // Failure
          });
      }
      user.batchID = [];
      user.type = "student";
      user.institutionID = undefined;
      await user.save();

      res.json({ status: "success", message: "Remove teacher successfully" });
    } else res.json({ status: "error", message: "Something wrong" });
  } catch (error) {
    res.json({ status: "error", message: "Something wrong" });
  }
};

function isLogin(data, email) {
  return data.filter((task) => task.session.email == email);
}
