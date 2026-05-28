import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    fullName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:[true, 'Email is required'],
        unique: [true, 'Email already exists'],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address']
    },
    profilePic: {
        type: String,
        default: ""
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    password:{
        required: true,
        type: String,
        minlength: [6, 'Password must be at least 6 characters long'],
        select : false
    }
},
{timestamps: true}
);

/** created a user model  */
const User = mongoose.model("User", userSchema);

export default User;