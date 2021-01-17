const conURL = require('./config');
const mongoose = require('mongoose');

const mongooseOptions = {
    useNewUrlParser: true,
    autoIndex:false
}

mongoose.connect(conURL.getURL('mongoose'),mongooseOptions)
.then(()=>{
   console.log("We are successfuly connected to database");
}, (err)=>{
   console.log('Error',err);
});

module.exports ={
   mongoose : mongoose,
}
