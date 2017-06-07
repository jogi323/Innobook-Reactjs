var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');
var passport=require('../config/passport');
/* GET home page. */
router.get('/', function(req, res) {
    res.send("hai");
});

router.get('/alldata', function(req, res) {
    controller.allData(req,res);
});

 router.post('/login',function(req, res) {
   controller.validateUser(req,res);
} );
router.post('/logOut',function(req,res){
    console.log("logOut");
    controller.logOut(req,res);
})
module.exports = router;
