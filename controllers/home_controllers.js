const Post = require('../models/post');
// const { posts } = require('./users_controllers');
const User = require('../models/user');

module.exports.home = async function(req,res){

    // Post.find({}, function(err, posts){
        
    // return res.render('home',{
    //     title: "CODIAL | Home",
    //     posts: posts
    // });

    // });
    try{

    

    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    let users = await User.find({});

    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users: users
    });


}
catch(err){
    console.log('Error', err);
    return;
}
}