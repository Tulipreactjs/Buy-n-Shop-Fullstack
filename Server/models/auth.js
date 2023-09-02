import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: [true, 'Username is required'],
            unique: true
        },
        email:{
            type:String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exist']
        },
        password: {
            type: String,
        },
        profileImg: {
            type: String,
        },
        isAdmin:{
            type: Boolean,
            default: false,
        },
    },
    {
      timestamps: true,  
    }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User