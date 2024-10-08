
const router = require('express').Router()

fs = require('fs'),
ccav = require('../controller/paymet/ccavutil'),
qs = require('querystring'),
ccavReqHandler = require('../controller/paymet/ccavRequestHandler'),
ccavResHandler = require('../controller/paymet/ccavResponseHandler');

router.post('/ccavRequestHandler',function(request, response){
        
    ccavReqHandler.postReq(request, response)
});


router.post('/ccavResponseHandler', function (request, response){
    
        ccavResHandler.postRes(request, response);
});

module.exports=router
