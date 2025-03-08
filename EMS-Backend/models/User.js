import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, require: [true, 'Name is the required field!']},
    email: {type: String, require: [true, 'email is the required field!']},
    password: {type: String, require: [true, 'password is the required field!']},
    role: {type: String, enum: ['admin', 'employee']},
    profileImage: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);
export default User;
