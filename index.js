const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-S');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
// const { use } = require('./routes');
app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));



app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name: 'Codiel',
    secret: 'blahsomethings',
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