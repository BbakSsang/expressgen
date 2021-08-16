const db=require('../routes/mydb');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
require('dotenv').config();


//jwt
const bcrypt = require('bcrypt'); //해쉬된 비밀번호를 비교하기위한 모듈
let jwt = require("jsonwebtoken");
let secretObj = require("./jwt");
//
//
// router.use(session({
//   secret: 'key',
//   resave: false,
//   saveUninitialized: true
// }));
//
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser('keyboard cat')); //?
router.use(session({secret: 'keyboard cat'})); //?
router.use(passport.initialize()); //이니셜라이즈 패스포트
router.use(passport.session()); //세션사용 패스포트
router.use(flash()); //메시지 사용
//
router.use(session({
  resave:false,
  saveUninitialized:false,
  secret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly:true,
    secure:false,
  }
}));
   




passport.serializeUser(function(user, done) { done(null, id); }); //user.id에 저장 식별값이 .,..로그인시 유저정보 세션에 저장 위해 호출

passport.deserializeUser(function(id, done) {
  user_id.findById(id, function(err, user) 
  
  { done(err, user); }); 


});//매요청시 호출한다는데...


// router.post('/login', async function(req, res, next){
//   //패포실행 ->로그인 로컬
// passport.authenticate('local',(authError,user,info)=>{//로컬전략에따른 로그인시도 응답작성
//   if(authError){
//     return res.json('user pww not found');
//   }
//   if(!user){
//     return res.json('user id not found');
//   }


//   return res.json('check');
// }
// )(req,res,next);//미들웨어실행
// }
// );


router.post('/login', async function(req, res, next){
  //패포실행 ->로그인 로컬
passport.authenticate('local',(authError,user,info)=>{//로컬전략에따른 로그인시도 응답작성
  if(authError){
    return res.json('user pww not found');
  }
  if(!user){
    return res.json('user id not found');
  }


  return res.json('check');
}
)(req,res,next);//미들웨어실행
}
);
///

passport.use(new LocalStrategy({
  usernameField:'user_id', //req.body.username
  passwordField:'password_hash',//req.body.password
},async function(user_id, password_hash, done){
  //로그인시 로직작성할것 아래코드는 예시코드 mysql작성하는거
  var sql='select password_hash,user_id from users where user_id like?;';
  var params=[user_id]; 
  db.query(sql, params, function(err, rows){
    console.log(rows[0]);
  
    if(err) return done(err);
    if(rows.length === 0){
      console.log("결과 없음");
      return done(null, false, { message: 'Incorrect' });
    }//에러처리 존나중요해씻팔
    if(rows[0].password_hash!==password_hash) { console.log('비버니틀려용');
    return done(null, false, { message: "pw not found" });
  }
    if(rows[0].password_hash===password_hash)  {console.log('비번이마자용');
    var user= rows[0];
    return done(null, user); //여기까지 오는거면 위로 디비의 유저아이디 비번이 저장되서 올라감
  }


  })
}
))





/*
router.post('/login', function(req, res) {
  user_id= req.body.user_id;
  password_hash = req.body.password_hash;
  login_type=req.body.login_type;
  res.json("user_id:"+user_id+","+"password_hash:"+password_hash+","+"signup_type은:"+login_type);
  var sql ='insert into users(user_id,password_hash,login_type) values(?,?,?)';
  var params=[user_id,password_hash,login_type];
  db.query(sql,params,function(err,rows){
    if(err)res.json('err1');
  })

});
*/




router.use(function(req, res, next){
    next();
});



/* GET users listing. */
router.post('/', function(req, res, next) {
  res.status(201).json('Account');
});




/////////// 회원가입 mysql 구현
router.post('/signup', function(req, res) {
    user_id= req.body.user_id;
    user_pw = req.body.user_pw;
    signup_type=req.body.signup_type;
    res.json("user_id:"+user_id+","+"user_pw:"+user_pw+","+"signup_type:"+signup_type);
    var sql ='insert into users(user_id,password_hash,login_type) values(?,?,?)';
    var params=[user_id,user_pw,signup_type];
    db.query(sql,params,function(err,rows){
      if(err)console.log(err)
    })

  });
  
  router.post('/signin', function(req, res, next){
    res.status(201).json("messeage" +":"+ "success");
});

router.post('/state', function(req, res, next){
    res.status(201).json("messeage" +":"+ "success");
});

module.exports = router;