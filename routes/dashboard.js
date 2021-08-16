var express = require('express');
var router = express.Router();


router.use(function(req, res, next){
    next();
});
/* GET home page. */
router.post('/', function(req, res, next) {
    res.status(201).json('Dashboard');
  });

router.post('/checkbox_click', function(req, res, next){
    res.status(201).json("messeage" +":"+ "success");
});

router.post('/datas', function(req, res, next){
    res.status(201).json("messeage" +":"+ "success");
});


module.exports = router;