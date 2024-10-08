const User = require('../../models/user')
exports.getInstitutions  = async (req,res,next) =>{
const institute = await User.find({type :'institution'})
if(institute){
  // const list = await institute.filter(task => task.type == 'institution' )
  //  if(list) 
   res.json({status:'success',message:institute})
}
}

exports.searchInstitution =async (req,res) =>{
  try {
    const check = await User.find({
      $or: [
        {
          type :'institution',
          name: { $regex: req.body.name,
            $options: "i"
          },
        
        },
      ],
    })
    if(check.length > 0){
     return res.json({status:'success',result:check})
    }else  return res.json({status:'info',message:'Institute is Not Found'}) 
  } catch (error) {
    throw error
  }
}