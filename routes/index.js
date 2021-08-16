var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  id= req.body.id;
  pw = req.body.pw;
  res.json("id:"+id+","+"pw:"+pw);
})



module.exports = router;
