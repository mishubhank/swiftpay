const express=require('express');
const cors=require('cors');
const mainRouter=require("./routes/index")
//const cors=require(cors);
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const app=express();
const port=3000;
app.use(cors());
app.use(express.json());
var cors_p ={
 origin:"*"


}
app.use('/api/v1',mainRouter);


mongoose.connect('mongodb+srv://shubhank1011:4IyjHhH3X7wUWqsD@cluster0.l0vtkvn.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

app.get('/',(req,res)=>{
res.send('hell');
}) 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})