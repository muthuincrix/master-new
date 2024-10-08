
const router = require('express').Router()
const adminRoute = require('./admin/route.js')
const instituteRoute = require('./institution/route.js')
const user = require('./user/route.js')
const {institutionControl} = require('../auth/auth.js')
const { isAdmin, AthuVerify } = require('../auth/auth.js')
const exam = require('./exam/route.js')
const {routerControl,examRouterControl} = require('../auth/auth.js')

//Middlewere

// router.use('/admin',AthuVerify,isAdmin,adminRoute)

router.use('/admin',routerControl,adminRoute)

// institution
router.use('/institution',institutionControl,instituteRoute)

router.use('/user',user)

router.use('/exam',examRouterControl,exam)
//GET


//POST


module.exports=router
