const db = require('../app');
let express = require('express');
let router = express.Router();
let models = require("./account");
let jwt = require("jsonwebtoken");
let secretObj = require("./jwt");


var user={
  email:'foo@example.com',
  pwd:'1234'
};
router.get("/login", function(req,res,next){
  // default : HMAC SHA256
  let token = jwt.sign({
        email: "foo@example.com"   // 토큰의 내용(payload)
      },
      secretObj.secret ,    // 비밀 키
      {
        expiresIn: '5m'    // 유효 시간은 5분
      })


  model.user.find({
    where: {
      email: "foo@example.com"
    }
  })
  .then( user => {
    if(user.pwd === "1234"){
      res.cookie("user", token);
      res.json({
        token: token
      })
    }
  })
})

module.exports = router;