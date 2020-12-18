const fs = require('fs');

const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const rfs = require('rotating-file-stream');
// const accessLogStream = rfs('access.log', 
// {
//     interval: '1d',
//     path: logDirectory
// });

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomethings',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sdarfat77@gmail.com',
            pass: 'captainlala@99'
        }
    },
    google_client_id: "1028187759479-f018kd93n7uno4ujtlup402ghu32b3qh.apps.googleusercontent.com",
    google_clientSecret: "k6uNYesM2p4Qwe49LPOED6g4",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    // morgan: {
    //     mode:'dev',
    //     options: {stream: accessLogStream}
    // }
}

const production = {
    name: 'production',
    //Here Below Environment Variable Is Used From Bash System ('/assets'),
    // asset_path: process.env.CODEIAL_ASSET_PATH,
    asset_path: '/assets',
    session_cookie_key: 'blahsomethings',
    db: 'codeial_production',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sdarfat77@gmail.com',
            pass: 'captainlala@99'
        }
    },
    google_client_id: "1028187759479-f018kd93n7uno4ujtlup402ghu32b3qh.apps.googleusercontent.com",
    google_clientSecret: "k6uNYesM2p4Qwe49LPOED6g4",
    google_callbackURL: "http://codearfat.com/users/auth/google/callback",
    jwt_secret: 'codeial',
    // morgan: {
    //     mode:'combined',
    //     options: {stream: accessLogStream}
    // }
}

module.exports = development;
//module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);