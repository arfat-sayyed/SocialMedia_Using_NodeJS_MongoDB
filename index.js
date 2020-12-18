const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-S');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-S');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);

console.log('Chat Server Is Listening On Port 5000');
const path = require('path');

//if(env.name == 'development'){
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
//}
// const { use } = require('./routes');
app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static(env.asset_path));
app.use('/uploads', express.static(__dirname + '/uploads'));

//app.use(logger(env.morgan.mode, env.morgan.options));


app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name: 'Codiel',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
            function(err){
                console.log(err || 'Connect Mongo Stetup');
            }

    )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthentication);//its working yes
app.use(flash())
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('If There Is Error Then Here It Is');
        console.log(`Error Is This : ${err}`);
        return;
    }

    console.log(`Server Is Running On Port No : ${port}`);
})