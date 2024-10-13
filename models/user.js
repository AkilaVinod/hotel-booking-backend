import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        type:{
            type:String,
            reuired:true,
            default:"customer"
        },
        whatsApp:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        }
    }
)

const User = mongoose.model("users",userSchema)

export default User
