const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user.router')


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

        app.use('/api', userRouter);

        app.use('/', (req, res) => {
            res.send('Hello world');
        })

        app.listen(4000,()=>{
            console.log("app listen port 4000")
        })