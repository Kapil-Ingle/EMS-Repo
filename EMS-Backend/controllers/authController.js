import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Otp from "../models/Otp.js";
import transporter from "../email/transporter.js";
// import dotenv from "dotenv";

// dotenv.config({path: './.env'});

const login = async(req, res) => {
    
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found!'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({
                status: 'fail',
                message: 'Wrong Password!'
            })
        }
        const token = jwt.sign(
            {_id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "10d"}
        )
        return res.status(200).json({
            status: 'success',
            token,
            // user: {_id: user._id, name: user.name, role: user.role}
            data: {
                user: {_id: user._id, name: user.name, role: user.role}
            }
        })
    } catch (error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'Email not found!'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Email available!',
            data: {
                user: { _id: user._id, name: user.name, role: user.role }
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }

}

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(newOtp, 10);
        const expireAt = new Date(Date.now() + 3 * 60 * 1000);

        await Otp.create({ email, otp: hashedOtp, expireAt });

        // Send Email
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Reset Password for Email OTP Authetication",
            html: `
      <div style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; 
                  border: 1px solid #ddd; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #4285F4; text-align: center;">Email OTP</h2>
          <hr style="border: 1px solid #ddd;">
          <p style="font-size: 16px; text-align: center;">Dear User,</p>
          <p style="font-size: 16px; text-align: center;">Your One-Time Password (OTP) is:</p>
          <h1 style="color: #4CAF50; text-align: center; font-size: 36px;">${newOtp}</h1>
          <p style="font-size: 14px; text-align: center;">Please use this OTP to complete your login Reset Password process. It is valid for 5 minutes.
              Do not share this code with anyone.</p>
          <p style="font-size: 14px; text-align: center;">Thank you for using Email OTP!</p>
          <hr style="border: 1px solid #ddd;">
          <p style="text-align: center; font-size: 12px; color: #888;">© <a href="https://www.yourwebsite.com" 
                  style="color: #4285F4; text-decoration: none;">employeemanagementsystem.com</a>. All rights reserved.</p>
      </div>
    `,
        };

        transporter.sendMail(mailOptions, (error) => {
            if(error){                
                return res.status(500).json({
                    status: 'fail',
                    message: error.message
                })
            }
            return res.status(200).json({
                status: 'success',
                message: 'OTP successfully sent on your email!'
            })
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(newOtp, 10);
        const expireAt = new Date(Date.now() + 3 * 60 * 1000);

        await Otp.findOneAndUpdate(
            { email },
            { otp: hashedOtp, expireAt },
            { upsert: true }
        );

        // Send Email
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Reset Password for Email Resend OTP Authetication",
            html: `
      <div style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; 
                  border: 1px solid #ddd; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #4285F4; text-align: center;">Email OTP</h2>
          <hr style="border: 1px solid #ddd;">
          <p style="font-size: 16px; text-align: center;">Dear User,</p>
          <p style="font-size: 16px; text-align: center;">Your One-Time Password (OTP) is:</p>
          <h1 style="color: #4CAF50; text-align: center; font-size: 36px;">${newOtp}</h1>
          <p style="font-size: 14px; text-align: center;">Please use this OTP to complete your login Reset Password process. It is valid for 5 minutes.
              Do not share this code with anyone.</p>
          <p style="font-size: 14px; text-align: center;">Thank you for using Email OTP!</p>
          <hr style="border: 1px solid #ddd;">
          <p style="text-align: center; font-size: 12px; color: #888;">© <a href="https://www.yourwebsite.com" 
                  style="color: #4285F4; text-decoration: none;">employeemanagementsystem.com</a>. All rights reserved.</p>
      </div>
    `,
        };

        transporter.sendMail(mailOptions, (error) => {
            if(error){                
                return res.status(500).json({
                    status: 'fail',
                    message: error.message
                })
            }
            return res.status(200).json({
                status: 'success',
                message: 'OTP successfully resent on your email!'
            })
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const verifyOtp = async (req, res) => {
    try{
        const { email, otp} = req.body;
        const savedOtp = await Otp.findOne({email}).select('otp');
        
        if(!savedOtp){
            return res.status(404).json({
                status: 'fail',
                message: 'OTP is expired!'
            })
        }

        const matched = await bcrypt.compare(otp, savedOtp.otp);
        
        if(!matched){
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid OTP!'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully!'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        
        if(!newPassword || !confirmPassword){
            return res.status(400).json({
                status: 'fail',
                message: 'All fields are required!'
            })
        }
        
        if(newPassword != confirmPassword){
            return res.status(400).json({
                status: 'fail',
                message: 'Password not matched!'
            })
        }
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found!'
            })
        }
        
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.status(200).json({
            status: 'success',
            message: 'Password reset successfully!'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export { login, verifyEmail, sendOtp, verifyOtp, resendOtp, resetPassword }