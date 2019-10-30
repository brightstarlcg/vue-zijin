const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {}
//通过配置信息来生成jwt的请求，验证这个token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    
    User.findById(jwt_payload.id)
        .then(user => {
          if(user){
            console.log(user);
            return done(null,user);
          }

          return done(null,false);
        })
        .catch(err => console.log(err));
  }));
}