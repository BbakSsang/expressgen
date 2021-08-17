
let express = require('express');
let router = express.Router();
let jwt = require("jsonwebtoken");
const db = require('./mydb');
var jwtkey = require("./jwt");
const bcrypt = require('bcrypt'); // 암호화

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser('keyboard cat')); //?
router.use(session({secret: 'keyboard cat'})); //?
require('dotenv').config();


router.use(session({
  resave:false,
  saveUninitialized:false,
  secret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly:true,
    secure:false,
  }
}));


router.get('/',function(req,res){
  res.send('hello');
  var token=jwt.sign({
  test:"test"
},
jwtkey.secret, //비밀키가 들어갈 자리 만약에 변수로 바꾼다면 이자리에 변수 ㄱㄱ
{
  subject:"sanghyun",
  expiresIn:"60m",
  issuer:"alexpark"
});
console.log("토큰생성",token);
try{
  var check=jwt.verify(token,jwtkey.secret);
  if(check){
    console.log("확인되었습니다",check.test); //test는 private claim값이다
  }
}catch(e){{
  console.log(e);
}}

});

// router.post('/signup', async (req, res, next) => {
//   const { user_id, login_type, password_hash } = req.body;
//   const {users}=db.query('slect * from users where user_id=?;',req.body.user_id,function(err,rows){
//     if(err)console.log(err)
//   })
//   // req.body로 email, nick, password를 가지고 옵니다.

//   try {
//     // 이미 email이 있는 경우를 방지
//     const exUser = await users.findOne({ where: { user_id } });
//     if (exUser) {
//       res.status(500).json({ error: '중복되는 이메일입니다.' });
//     }
// 	// bcrypt로 password를 암호화해줍니다.
//     const hash = await bcrypt.hash(password_hash, 12);
//     await users.create({
//       user_id,
//       login_type,
//       password_hash: hash,
//     });
//     return res.status(200).json({success: 'true'});
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });


router.post('/signup', async function(req, res) {
  //user_id= req.body.user_id;
  user_pw =await bcrypt.hash(req.body.password_hash, 12);
  //user_pw =req.body.password_hash;
  login_type=req.body.login_type;
  user_id= req.body.user_id;

  console.log(user_pw);
  

  res.json("user_id:"+user_id+","+"user_pw:"+user_pw+","+"login_type:"+login_type);
  var sql ='insert into users(user_id,password_hash,login_type) values(?,?,?)';
  var params=[user_id,user_pw,login_type];
  db.query(sql,params,function(err,rows){
  if(err)console.log(err)
  })

});

module.exports = router;
