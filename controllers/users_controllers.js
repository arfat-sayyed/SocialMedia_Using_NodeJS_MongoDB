const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
    
}

module.exports.posts = function(req,res){
    return res.end('<h1> User Post Is Running</h1>');
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
        
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorize');
    }
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_signup', {
        title : "Codial Signup"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', {
        title : "Codial SignIn"
    })
}

module.exports.create = function(req,res){

    if(req.body.password != req.body.confirm_password){
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

}//kab se kaam nhi kr raha hain?konse topic kiya tha last?
// deleting and updating and from sign in and sign up my locals.user was not working so took reference from files coding ninja then? 
// yes from then i removed locals.user part and then it was running but post was not showing. after i copy some code from reference file ok

module.exports.createSession = function(req,res){
    req.flash('success', 'Loging Successfully To Website');
    return res.redirect('/');
}


module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Sing Out Successfully To Website');
    return res.redirect('/');
    
}