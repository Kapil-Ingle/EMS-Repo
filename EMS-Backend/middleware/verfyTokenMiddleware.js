import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const verifyToken = (req, res, next) => {
    try {const token = req.header('auth-token').token.split(' ')[1];
    if(!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Access denied!'
        })
    }
    
    const decoded = jwt.verifyToken(token, process.env.JWT_SECRET_KEY);
    if(!decoded){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid token!'
        })
    }

    const user = User.findById(decoded._id).select('-password');
    if(!user){
        return res.status(404).json({
            status: 'fail',
            message: 'User not found!'
        })
    }

    res.user = user;
    next();
    } catch (error){
        res.json({
            status: 'fail',
            message: error.message
        })
    }
}

export default verifyToken;