const Post = require('../models/post');
const { posts } = require('./users_controllers');

module.exports.home = function(req,res){

    // Post.find({}, function(err, posts){
        
    // return res.render('home',{
    //     title: "CODIAL | Home",
    //     posts: posts
    // });

    // });

    Post.find({}).populate('user').exec(function(err, posts){
        
        return res.render('home',{
            title: "CODIAL | Home",
            posts: posts
        });
    
        });

};