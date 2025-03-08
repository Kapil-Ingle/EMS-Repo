import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const login = async(req, res) => {
    console.log('controller hit');
    
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                status: 'fail',
                message: 'User not found!'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(404).json({
                status: 'fail',
                message: 'Wrong Password!'
            })
        }
        const token = jwt.sign(
            {_id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "10d"}
        )
        res.status(200).json({
            status: 'success',
            token,
            user: {_id: user._id, name: user.name, role: user.role}
        })
    }catch(error){
        console.log(error.message);
    }
}

export { login }