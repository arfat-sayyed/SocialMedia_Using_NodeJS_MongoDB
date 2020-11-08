const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const { use } = require('./routes');
app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log('If There Is Error Then Here It Is');
        console.log(`Error Is This : ${err}`);
        return;
    }

    console.log(`Server Is Running On Port No : ${port}`);
})