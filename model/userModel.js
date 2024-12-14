import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    otpExpiration: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

export const User = mongoose.model("User", userSchema);