// const mongoose = require('mongoose')

// const connectDB = ()=>{
//     mongoose
// .connect(process.env.MONGODBURL,{
//     useNewUrlParser: true,        
//     useUnifiedTopology: true
// })
// .then((res)=>{
//     console.log('connect dataBase');
// })
// }

// module.exports = connectDB

var mongoose = require('mongoose')
const serverSelectionTimeoutMS = 10000;
let connection = null;
var poolsize = 2;

module.exports = async function () {
  if (
    connection === null ||
    (connection.connection.readyState !== 1 &&
      connection.connection.readyState !== 2)
    // readystate 1 === connected, 2 === connecting, I don't want to start new connection if it's already connecting.
  ) {
    mongoose = require("mongoose");
    console.log("[MONGOOSE] Creating New Connection");

    mongoose.connection.on("open", () => {
        console.log("Connected with poolSize " + poolsize);
   //   log("[ MONGOOSE] Connected with poolSize " + poolsize);
    });

    try {
      mongoose.connect(process.env.MONGODBURL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
       // serverSelectionTimeoutMS,
       //   connectTimeoutMS: 10000,
        maxPoolSize: poolsize,
      });
      
    } catch (err) {
      console.log("Mongoose connection error", err);
    }
    connection = mongoose; //save it to the cache variable
    return;
  } else {
    return;
  }
};
