const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shubhank1011:4IyjHhH3X7wUWqsD@cluster0.l0vtkvn.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{console.log("DB Connected")})
.catch((error)=>{ console.log("DB not Connected",error);})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:6,
        maxLength:25
    },
    password:{
        type:String,
        required: true,
        minLength:6,
    },
    firstName:{
        type:String,
        required: true,
        maxLength:20,
    },
    lastName:{
        type:String,
        required: true,
        maxLength:20,
    }
});


const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance:{
        type: Number,
        required:true,
    },
})
const Account = mongoose.model('Account' ,accountSchema);
const User = mongoose.model('User' , userSchema);

module.exports ={
    User ,Account
};



