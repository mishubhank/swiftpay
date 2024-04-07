const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { User ,Account} =require('./db')


const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message:"Something went Wrong"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const _id = decoded.userId;
        const user = await User.findById(_id);
        if(!user){
            return res.status(403).json({
                message:"Unauthorized"
            })
        }
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            message:"Invalid Authorization"
        });
    }
};
  
module.exports = {
    authMiddleware ,
}