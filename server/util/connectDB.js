const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose
.connect(process.env.MONGODBURL,{
    useNewUrlParser: true,        
    useUnifiedTopology: true
})
.then((res)=>{
    console.log('connect dataBase');
})
}

module.exports = connectDB

