const { connections } = require('mongoose');

var promise = require('es6-promise').Promise;
const mongoose = require('../config/connect').mongoose;

const UserSchema  = new mongoose.Schema({
    Name: String,
    Email : String,
    Password : String,
    Role : {
      type: String,
      enum : ['superadmin','admin', 'employee'],
      default: 'superadmin'
    },
    CreatedDate : {type: Date, default: Date.now},
    UpdatedDate : Date,
})

const User = mongoose.model('User', UserSchema)

let saveOneData = (body)=>{
    return new promise((resolve, reject)=>{
         let  user = new User(body);
          user.save(body, (err, user)=>{
            if(err){
              console.log(err);
              reject(err);
            }else{
            resolve(user);
            }
          })
      })
   }

  let getManyUsers = (condition, projection)=>{
    return new promise((resolve, reject)=>{
      try{
        User.find({}, {}).skip(condition.skip).limit(condition.limit).exec(function (err, users) {
            if(err){
              reject(err);
            }else{
            resolve(users);
            }
          })
        }catch(err){
          reject(err);
        }
      })
   }

   let getOneUser = (condition, projection)=>{
    return new promise((resolve, reject)=>{
      try{
          User.findOne(condition, projection, (err, user)=>{
            if(err){
              reject(err);
            }else{
            resolve(user);
            }
          })
        }catch(err){
          reject(err);
        }
      })
   }

   let getUsers = (condition, projection)=>{
    return new promise((resolve, reject)=>{
      try{
        console.log(condition);
          User.find(condition, projection, (err, user)=>{
            if(err){
              console.log(err);
              reject(err);
            }else{
            resolve(user);
            }
          })
        }catch(err){
          console.log(err);
          reject(err);
        }
      })
   }



module.exports ={
    saveOneData : saveOneData,
    getManyUsers : getManyUsers,
    getOneUser : getOneUser,
    getUsers :getUsers
}