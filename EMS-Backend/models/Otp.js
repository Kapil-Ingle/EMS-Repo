import mongoose from "mongoose";

const otpSchema  = new mongoose.Schema({
    email: {type: String, required: [true, 'Email is the required field!']},
    otp: {type: String, required: [true, 'OTP is the required field!']},
    createdAt: {type: Date, default: Date.now},
    expireAt: {type: Date, required: [true, 'ExpireAt is the required field!']}
});

otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;