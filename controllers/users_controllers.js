const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.end('<h1>User Profile Is ready');
}

module.exports.posts = function(req,res){
    return res.end('<h1> User Post Is Running</h1>');
}

module.exports.signup = function(req,res){
    return res.render('user_signup', {
        title : "Codial Signup"
    })
}

module.exports.signin = function(req,res){
    return res.render('user_signin', {
        title : "Codial SignIn"
    })
}

module.exports.create = function(req,res){

    if(req.body.password != req.body.confirm){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in User Creating'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })

}

module.exports.createSession = function(req,res){
    
}