var passport=require("passport");
var user =require('../controllers/connection');
var localStrategy=require("passport-local").Strategy;

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(is,function(err,user){
        done(err,user);
    });
});
passport.use('local.signin', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    user.findOne({'email':email},function(err,user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false,{msg:"hjguyk"});
        }else{
            return done(null,user);
        }
    })
}));