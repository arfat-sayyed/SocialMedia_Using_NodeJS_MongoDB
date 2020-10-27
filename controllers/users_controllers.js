module.exports.profile = function(req, res){
    return res.end('<h1>User Profile Is ready');
}

module.exports.posts = function(req,res){
    return res.end('<h1> User Post Is Running</h1>');
}