const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log('If There Is Error Then Here It Is');
        console.log(`Error Is This : ${err}`);
        return;
    }

    console.log(`Server Is Running On Port No : ${port}`);
})