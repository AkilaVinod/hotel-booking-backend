
import User from "../models/user.js"
import jwt from 'jsonwebtoken'

/* export function getUsers(req,res){
    User.find().then((userList)=>{
        res.json({
            list:userList
        })
    })
} */

export function postUsers(req,res){
    
    const user = req.body

    const newUser = new User(user)
    newUser.save().then(()=>{
        res.json({
            message:"User created successfully"
        })
    }).catch(()=>{
        res.json({
            message:"User creation failed"
        })
    })

}
/*
export function deleteUsers(req,res){
    res.json({
        message:"This is a delete request"
    })}

export function putUsers(req,res){
    res.json({
        message:"This is a put request"
    })} */


export function loginUser(req,res){
    const credentials = req.body
    User.findOne({email:credentials.email , password:credentials.password}).then(
        (user)=>{
            if(user == null){
                res.status(404).json({
                    message:"User not found"
                })
            } else{

                const payload = {
                    id:user.id,
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    type:user.type
                };

                const token = jwt.sign(payload,"secret",{expiresIn:"48h"})

                res.json({
                    message:"User found",
                    user:user,
                    token:token
                })
            }
        }
    )
}