
const session = require("express-session");
const mongoDBstore = require("connect-mongodb-session")(session);
const examState = require("../models/examState");
const User = require('../models/user')
const sessions = require("../models/session.js");
const {isLogin} = require('../util/sessionVerfy.js')
exports.sessionManagement = async (app) => {
  const store = new mongoDBstore({
    uri: process.env.MONGODBURL,
    collection: "sessions",
  });

  // Catch errors
  store.on("error", function (error) {});
  app.use(
    session({
      secret: "This is a secret",
      resave: false,
      httpOnly: true,
      saveUninitialized: false,
      cookie: {
         expires: 604800000
      },
      store: store,
    })
  );
};

exports.AthuVerify = (req, res, next) => {
  if (req.session.isAuth) {
    // req.session.UserRoll = "Admin"
    next();
  } else {
    res.redirect("/");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.session.UserRoll == "Admin") {
    next();
  } else {
    res.json({
      status: 401,
      message: "Your are not authorized to access",
    });
  }
};

exports.isUser = (req, res, next) => {
  if (req.session.UserRoll == "Admin") {
    next();
  } else {
    res.json({
      status: 401,
      message: "Your are not authorized to access",
    });
  }
};

exports.userVerify = (req, res, next) => {
  if (req.session.isAuth) {
    if (req.session.userRoll == "student") return next();
    if (req.session.userRoll == "teacher" || req.session.userRoll == "admin" ||  req.session.userRoll == " institution")
    if(req.session.userRoll == "teacher" || req.session.userRoll == "institution"  ) return res.redirect(`/institution?=${req.session.institutionID}`)
    return res.redirect(`/admin/dashboard?=${req.session.userID}`);
  } else {
    return res.redirect("/login");
  }
};

exports.userCreate = (req, res, next) => {
  if (req.session.isCreate) {
    next();
  } else {
    res.redirect("/signup");
  }
};

exports.isLogin = (req, res, next) => {
  if (req.session.isAuth) {
    if (req.session.examID) res.redirect(`/exam/state?=${req.session.examID}`);
    else if (
      req.session.userRoll == "teacher" ||
      req.session.userRoll == "admin" ||
      req.session.userRoll == " institution"
    )
     {
     
      return res.redirect(`/admin/dashboard?=${req.session.userID}`);}
    else return res.redirect(`/?=${req.session.userID}`);
  } else {
    next();
  }
};
exports.isSignIn = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect(`/login`);
  }
};
exports.isRoll = async (req, res, next) => {
  try {
   
    if (req.session.isAuth) {
        if (req.session.userRoll == "teacher" || req.session.userRoll == "admin" || req.session.userRoll == "institution" )
     {   
       if(req.session.userRoll == "teacher" || req.session.userRoll == "institution"  ) return res.redirect(`/institution?=${req.session.institutionID}`)
    // else
    return  next()
    }
      else res.redirect(`/?=${req.session.userID}`);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
  throw error
  }
};

exports.examInfo = async (req, res, next) => {
  try {
   
    if (!req.session.examID) {

      const State = await examState.findOne({ userID: req.session.userID });
      if (State) {
        
        req.session.examID = State.examID;
       return res.redirect(`/exam/state?=${req.session.examID}`);
      } else if (req.session.examID) {
      
       return res.redirect(`/exam/state?=${req.session.examID}`);
      } 
     return next()
    } else {
      res.redirect(`/exam/state?=${req.session.examID}`);
    }
  } catch (error) {
    throw error
  }
};

exports.checkExamInfo = async (req, res, next) => {
  try {
      const State = await examState.findOne({ userID: req.session.userID });
      if (State) {
       
        req.session.examID = State.examID;
       return res.redirect(`/exam/info?=${req.session.examID}`);
      } 
       if (req.session.examID) {
      
       return res.redirect(`/exam/info?=${req.session.examID}`);
      } 
     return res.redirect(`/login`);
    
  } catch (error) {
    throw error
  }
};
exports.isValueExam = async (req, res, next) => {
  try {
    if (
            req.session.userRoll == "teacher" ||
            req.session.userRoll == "admin" ||
            req.session.userRoll == "institution"
          )
            return res.redirect(`/login`);
    if (req.session.examID) {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    throw error
  }
};



exports.isSignIn = (req, res, next) => {
  if (req.session.isAuth) {
    if (
      req.session.userRoll == "teacher" ||
      req.session.userRoll == "admin" ||
      req.session.userRoll == "institution"
    )
      return res.redirect(`/login`);
    if (req.session.examID) next();
    else res.redirect(`/login`);
  } else {
    res.redirect(`/login`);
  }
};

// router control
exports.routerControl = async (req,res,next) =>{
  try {
    if(req.session.isAuth && req.session.userRoll == 'admin' ) {
      next()
    }
    else {
      if(req.session.isAuth)
      {
        const getVerify = await isLogin(req.session.email);
        const isDelete = await sessions.deleteMany({
          expires: getVerify[0].expires,
        }).then(function () {
          console.log("Data deleted routerControl")  //  Success
        })
        .catch(function (error) {
          console.log(error) // Failure
        });
       return res.redirect('/')
      }
    return  res.redirect('/error')
  }
  } catch (error) {
    throw error
  }
}


exports.examRouterControl = async (req,res,next) =>{
  try {
    if( req.session.isAuth && req.session.userRoll == 'admin' || req.session.isAuth && req.session.userRoll == 'student' ) {
      next()
    }
    else {
    return  res.redirect('/error')
  }
  } catch (error) {
    throw error
  }
}

exports.userRouterControl = async(req,res,next) =>{
  try {
    if(req.session.isAuth && req.session.userRoll == 'student'  ) {
      next()
    }
    else {
    return  res.redirect('/error')
  }
  } catch (error) {
    throw error
  }
}

exports.institutionControl = async (req,res,next) =>{
  try {
    if( req.session.userRoll == 'institution' || req.session.isAuth && req.session.userRoll == 'teacher' ) next()
    else {
      if(req.session.isAuth)
      {
        const getVerify = await isLogin(req.session.email);
        const isDelete = await sessions.deleteMany({
          expires: getVerify[0].expires,
        }).then(function () {
          console.log("Data deleted institutionControl"); //  Success
        })
        .catch(function (error) {
          console.log(error) // Failure
        });
       return res.redirect('/')
      }
 return res.redirect('/error')
}
  } catch (error) {
    throw error
  }
 
}

//

exports.sessionDistroy = async(req,res,next) =>{
  try {
    if(req.session.isAuth)  return res.redirect(`/?=${req.session.userID}`);
    else next()
  } catch (error) {
    throw error
  }
  }

// goal auth

exports.verifyGoal = async (req,res,next) =>{
try {
  const user = await User.findOne({
   email:req.session.email
  });
  if(user){
    if(user.goal.length == 0) next()
    else res.redirect('/login')
  }
} catch (error) {
  throw error
}
}


//PayMent


