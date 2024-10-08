const User = require("../../../models/user");
const Sessions = require("../../../models/session");

exports.manageUser = async (req, res) => {
  try {
    let TotalUser = [];
    await getPaginatedData(1, 6, "", "")
      .then((data) => {
        TotalUser = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    if (TotalUser) {
      const getTotalUser = [];
      for (let i = 0; i < TotalUser.length; i++) {
        getTotalUser.push({
          name: TotalUser[i].name,
          type: TotalUser[i].type,
          action:
            TotalUser[i].action == undefined ? false : TotalUser[i].action,
          email: TotalUser[i].email,
          userID: TotalUser[i]._id,
        });
      }

    return  res.json({ status: "success", getTotalUser });
    } else res.json({ status: "404" });
  } catch (error) {
    throw error;
  }
};

exports.nextPageManageUser = async (req, res) => {
  try {
    let TotalUser = [];
    const { nextPage, filter, searchEmail } = req.body;
    console.log(req.body);
    await getPaginatedData(
      nextPage > 0 ? nextPage + 1 : 1,
      6,
      filter,
      searchEmail
    )
      .then((data) => {
        TotalUser = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (TotalUser.length > 0) {
      const getTotalUser = [];
      for (let i = 0; i < TotalUser.length; i++) {
        getTotalUser.push({
          name: TotalUser[i].name,
          type: TotalUser[i].type,
          action:
            TotalUser[i].action == undefined ? false : TotalUser[i].action,
          email: TotalUser[i].email,
          userID: TotalUser[i]._id,
        });
      }
     return res.json({ status: "success", getTotalUser });
    } else res.json({ status: "info" });
  } catch (error) {
    throw error;
  }
};

exports.pageManageUserFilter = async (req, res) => {
  try {
    let TotalUser = [];
    const { filter } = req.body;
    console.log(req.body);
    await getPaginatedDataFilter(1, 6, filter)
      .then((data) => {
        TotalUser = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (TotalUser.length > 0) {
      const getTotalUser = [];
      for (let i = 0; i < TotalUser.length; i++) {
        getTotalUser.push({
          name: TotalUser[i].name,
          type: TotalUser[i].type,
          action:TotalUser[i].action == undefined ? false : TotalUser[i].action,
          email: TotalUser[i].email,
          userID: TotalUser[i]._id,
        });
      }
     return res.json({ status: "success", getTotalUser });
    } else res.json({ status: "info" });
  } catch (error) {
    throw error;
  }
};

exports.pageManageUserSeachEmail = async (req, res) => {
  try {
    let TotalUser = [];
    const { searchEmail } = req.body;
 
    await getPaginatedDataSearch(1, 6, searchEmail)
      .then((data) => {
        TotalUser = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    TotalUser;
    if (TotalUser.length > 0) {
      const getTotalUser = [];
      for (let i = 0; i < TotalUser.length; i++) {
        getTotalUser.push({
          name: TotalUser[i].name,
          type: TotalUser[i].type,
          action:TotalUser[i].action == undefined ? false : TotalUser[i].action,
          email: TotalUser[i].email,
          userID: TotalUser[i]._id,
        });
      }
     return res.json({ status: "success", getTotalUser });
    } else res.json({ status: "info" });
  } catch (error) {
    throw error;
  }
};

const getPaginatedData = async (page, pageSize, filter, searchEmail) => {
  try {
    if (filter == "" && searchEmail == "") {
      const skipAmount = (page - 1) * pageSize;
      const result = await User.find().skip(skipAmount).limit(pageSize);
      return result;
    } else if (filter !== "") {
      if (filter == "Blocked") {
        const skipAmount = (page - 1) * pageSize;
        const result = await User.find({ action: true })
          .skip(skipAmount)
          .limit(pageSize);

        return result;
      }
      const skipAmount = (page - 1) * pageSize;
      const result = await User.find({
        type:
          filter == "Student"
            ? "student"
            : filter == "Institution"
            ? "institution"
            : filter == "Teacher"
            ? "teacher"
            : "",
      })
        .skip(skipAmount)
        .limit(pageSize);

      return result;
    } else if (searchEmail !== "") {
      const skipAmount = (page - 1) * pageSize;
      //   const result = await User.find().skip(skipAmount).limit(pageSize);
      const result = await User.find({
        $or: [
          {
            email: { $regex: searchEmail, $options: "i" },
          },
        ],
      })
        .skip(skipAmount)
        .limit(pageSize);

      return result;
    }
  } catch (error) {
    console.error("Error getting paginated data:", error);
    throw error;
  }
};

async function getPaginatedDataFilter(page, pageSize, filter) {
  try {
    if (filter == "Blocked") {
      const skipAmount = (page - 1) * pageSize;
      const result = await User.find({ action: true })
        .skip(skipAmount)
        .limit(pageSize);

      return result;
    }
    const skipAmount = (page - 1) * pageSize;
    const result = await User.find({
      type:
        filter == "Student"
          ? "student"
          : filter == "Institution"
          ? "institution"
          : filter == "Teacher"
          ? "teacher"
          : "",
    })
      .skip(skipAmount)
      .limit(pageSize);

    return result;
  } catch (error) {
    console.error("Error getting paginated data:", error);
    throw error;
  }
}

async function getPaginatedDataSearch(page, pageSize, searchEmail) {
  try {
    const skipAmount = (page - 1) * pageSize;
    const result = await User.find({
      $or: [
        {
          email: { $regex: searchEmail, $options: "i" },
        },
      ],
    })
      .skip(skipAmount)
      .limit(pageSize);

    return result;
  } catch (error) {
    console.error("Error getting paginated search data:", error);
    throw error;
  }
}

exports.manageUserBlock = async (req, res) => {
  const { userID, action } = req.body;
  let get = await Sessions.find();

  try {
    const result = await User.findOne({ _id: userID });

    if (result) {
      const getVerify = await isLogin(get, result.email);
 
      if (action) {
        result.action = false;
     if(getVerify.length > 0)
     {   await Sessions.deleteMany({
          expires: getVerify[0].expires,
        })
          .then(function () {
            console.log("Data deleted for unblock"); //  Success
          })
          .catch(function (error) {
            console.log(error); // Failure
          });}
        await result.save();
        return res.json({
          status: "success",
          message: "User UnBlocked successfully",
        
        });
      } else if (!action) {
        result.action = true;
        if(getVerify.length > 0)
        {   await Sessions.deleteMany({
             expires: getVerify[0].expires,
           })
             .then(function () {
               console.log("Data deleted for unblock"); //  Success
             })
             .catch(function (error) {
               console.log(error); // Failure
             });}
        await result.save();
        return res.json({
          status: "success",
          message: "User Blocked successfully",
        });
      }
    } else res.json({ status: "error", message: "something went wrong" });
  } catch (error) {
    throw error;
  }
};

function isLogin(data, email) {
  return data.filter((task) => task.session.email == email);
}
