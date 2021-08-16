// mysql 연결

const mysql = require('mysql');
const { response } = require('express');
const { resourceUsage } = require('process');

const db= mysql.createConnection({
  host: '3.36.115.233', //개인ip주소
  user:'alexpark216',
  password: 'park96',
  port:3306,
  database:'LostArkDB'
});

db.connect(function(err) {
  
  if (err) throw err;
  console.log('Connected');
  });

  module.exports=db;