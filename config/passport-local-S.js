const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
function(req ,email, password, done){
    User.findOne({email : email}, function(err, user){
        if(err){
            req.flash('error', err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username And Password');
            return done(null,false);
        }

        return done(null,user);
    });
}

));

passport.serializeUser(function(user,done){
    console.log(user.id);
        done(null, user.id);
});


passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error In Finding User');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthentication = function(req, res, next){
    if( req.isAuthenticated()){
        res.locals.user = req.user
    }

    next();
}

module.exports = passport;