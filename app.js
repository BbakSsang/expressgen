var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');




// 변수 설정
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var mydb = require('./routes/mydb');
//

var app = express();

const db=require('./routes/mydb');
  
app.get('/', (req, res) => {  
  
  db.query('select * from users;', function(err, result) {
    if (err) throw err;
    res.send(result);
    });
})// view engine setup
//pass





//
require('dotenv').config();
//추가 패스포트
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.COOKIE_SECRET));

//추가 패스포트



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//홈
app.use('/users', usersRouter);//유저
app.use('/account', accountRouter);//어카운트
app.use('/dashboard', dashboardRouter);//대쉬보드
app.use('/login', loginRouter);//대쉬보드 


 app.listen(8000, () => {
     console.log(`Example app listening at http://localhost:8000`)
   })


module.exports = app;
