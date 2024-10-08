const Payment = require("../models/payment.js");
const Course = require("../models/course.js");
const User = require("../models/user.js");
exports.PaymentStatus = async (req) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    const coures = await Course.findOne({ _id: req.session.Plan });
    if (user && coures) {  
        const date = new Date()
        let indianTime = date.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        });
        const month = indianTime.split(',')[0]
        const time =  indianTime.split(',')[1].trim()

      const payment = await Payment({
        name: user.name,
        userID: user._id,
        email: user.email,
        courseID: coures._id,
        courseName: coures.title,
        discount: req.session.discount,
        totalAmount: req.session.totalAmount,
        amount:req.session.amount,
        date:month,
        time:time,
        address:user.address,
        city:user.city,
        pincode:user.pincode,
        state:user.state,
        planMonth:req.session.planMonth,
      });
      await payment.save();
      req.session.paymentID = payment._id;
      return payment._id
    }
    else{
        console.log('you are not authorized');
    }
  } catch (error) {
    throw error;
  }
};
