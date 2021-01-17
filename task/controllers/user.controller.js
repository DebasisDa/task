var UserModel = require('../models/user.model')
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

let getUsers = async function (req, res) {
       console.log(req.query);
       UserModel.getManyUsers({ skip: parseInt(req.query.skip), limit: parseInt(req.query.limit) }
        ,{password: 0})
    .then((result)=>{
        res.status(200).json({data : result });
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({message: "Try again.." });
    })
}


let login = async function (req, res) {
    if (req.body.Email && req.body.Password){
        UserModel.getOneUser( req.body,{'Password' : 0})
        .then((result)=>{
        console.log(result);
         if(!result){
            res.status(401).json({message : 'Unauthorized '});
         } else {
          // Generate json web token
          const userJWT = jwt.sign({
            id : result._id,
            email : result.Email
        }, 'salt')

          const token = {
            jwt : userJWT
          }
    
            res.status(200).json({'token': token });
        }
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json({message: "Try again.." });
        })
     }else{
        res.status(400).json({message: "Try again.." });
     }
}

let setOneUser = async function (req, res) {
    if (req.body.Name && req.body.Email && req.body.Password){
        UserModel.saveOneData(req.body)
    .then((result)=>{

      // Generate json web token
      const userJWT = jwt.sign({
        id : result._id,
        email : result.Email
    }, 'process.env.JWT_KEY')

          const token = {
            jwt : userJWT
          }
    
            res.status(200).json({'token': token });
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({message: "Try again.." });
    })
 }else{
    res.status(400).json({message: "Try again.." });
 }
}

let searches = async function (req, res) {
    console.log(req.body);
    const startDate = new Date(req.body.CreatedDate.startdate);
    const endDate = new Date(req.body.CreatedDate.enddate);
    const Role = req.body.Role;
    console.log(startDate);
    console.log(endDate);
    userModel.getUsers(
        {'$or' : [
        {
            'CreatedDate' : {
                '$gte':new Date(startDate),
                '$lte': new Date(endDate)
            }
        },
        {
          'Role' : {'$in' : Role}
        }
        ]
        } 
        ,{'password' : 0})
    .then((users) => {
        console.log(users);
        res.json({'Users' : users})
    })
}
module.exports = {
getUsers: getUsers,
setOneUser : setOneUser ,
login : login,
searches : searches
};


