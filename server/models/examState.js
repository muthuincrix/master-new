const {Schema, model} = require('mongoose');

const examStateSchema = new Schema({   
    examID:{   
        type:Schema.Types.ObjectId,
        ref:'exam',
        required:true,
        index: true,
        sparse: true,
    },
    userID:{
        
        type:Schema.Types.ObjectId,
        ref:'User',
        index: true,
        sparse: true,
        unique:true,
        required:true,

    },
})



module.exports = model('examState',examStateSchema);
