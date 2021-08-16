const db=require('../routes/mydb');

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser('keyboard cat'));
router.use(session({secret: 'keyboard cat'}));
router.use(passport.initialize());
router.use(passport.session());