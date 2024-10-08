const User = require("../models/user.js");
const crypto = require("crypto");
const examState = require("../models/examState.js");

exports.isExam = async (req, res, next) => {
    if (!req.session.examID) {
        const password = req.body.password;
        const secret = "This is a company secret ";
        const sha256Hasher = crypto.createHmac("sha256", secret);
        const hash = sha256Hasher.update(password).digest("hex");
        const check = await User.findOne({ email: req.body.email, password: hash });
        if (check) {
            req.session.isAuth = true;
    req.session.isLogin = true;
    req.session.userID = check._id;
    req.session.userRoll = check.type;
    req.session.userName = check.name;
    req.session.email = check.email;
            const State = await examState.findOne({userID:check._id})
        if(State){
          req.session.examID = State.examID;
          
          res.redirect("/exam/state");
        }
        else{
            next()
        }
        }
        
    } else {
        next();
    }
    }