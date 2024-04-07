const express = require('express');
const { User , Account } = require("../db");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcrypt');
const  { authMiddleware } = require("../middleware");


const signupBody = zod.object({
    username: zod.string().email().min(6),
    firstName: zod.string().min(2),
    lastName: zod.string().min(2),
    password: zod.string().min(6)
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const updateBody = zod.object({
	password: zod.string().min(6).optional(),
    firstName: zod.string().min(2).optional(),
    lastName: zod.string().min(2).optional(),
})

router.post('/signup', async (req,res)=>{
    const { success, data } = signupBody.safeParse(req.body);
     if(!success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
     }

    const { username, password, firstName, lastName } = data;

     try{
     const existingUser = await User.findOne({username})

     if(existingUser){
        return res.status(411).json({
            message:"User Already Exist"
        })
     }
     const hashedPassword = await bcrypt.hash(password, 10);

     const user = await User.create({
        username,
        password:hashedPassword,
        firstName,
        lastName,
     })

     const userId = user._id;

     await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

     
        const token = jwt.sign({ userId }, JWT_SECRET);
        return res.json({
            message: "User Created Successfully",
            firstName:firstName,
            lastName:lastName,
            token: token
        });
    } catch (error) {
        console.error("Error generating JWT token:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

router.post('/signin', async (req,res)=>{
    const {success ,data } = signinBody.safeParse(req.body);
    if(!success){
       return res.status(411).json({
           message:"Incorrect Inputs"
       })
    }
    const { username, password} = data;
    try{

       const existingUser = await User.findOne({username});

       if(!existingUser){
           return res.status(411).json({
               message:"User Does Not Exist"
           })
       }
       const passwordMatch = await bcrypt.compare(password,existingUser.password);   
       
           if(passwordMatch){
               const token = jwt.sign({userId: existingUser._id},JWT_SECRET);
               return res.json({
                   message:"Login Successfully",
                   firstName:existingUser.firstName,
                   lastName:existingUser.lastName,
                //    userId:existingUser.userId,
                   token:token });
           }
           else{
               return res.status(401).json({
                   message:"Incorrect password"
               })
           }
       
    }
    
    catch(error){
       console.error("Error while logging in:", error);
       return res.status(500).json({
           message: "Internal Server Error"
       });
    }
    
});


router.put("/",authMiddleware,async(req,res)=>{
    const {success ,data } = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    try{
        const {password ,firstName ,lastName} = data;
        if( password ){
            hashedPassword = await bcrypt.hash(password ,10);
        }
        const update = {};
        if (firstName) update.firstName = firstName;
        if (lastName) update.lastName = lastName;
        if (hashedPassword) update.password = hashedPassword

        await User.updateOne({ _id: req.userId }, update);
        return res.json({
            message: "Updated successfully"
            })
    }
    catch (error) {
        console.error("Error while updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



router.get("/bulk", authMiddleware,async (req, res) => {
    const filter = req.query.filter || '';
    
    const users = await User.find({
        $or: [
            { firstName: { $regex: new RegExp(filter, "i") } }, 
            { lastName: { $regex: new RegExp(filter, "i") } }   
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.delete("/delete", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
  
      await User.findByIdAndDelete(userId);
      await Account.findOneAndDelete({ userId });
  
      res.json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


router.get('/username',authMiddleware, async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token not provided' });
    }
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const _id = decoded.userId;

      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ username: user.username ,userId:_id});
    } catch (error) {
 
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  });

module.exports = router;