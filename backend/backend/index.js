const express = require('express');
const rootRouter = require('./routes/index');

const cors =require("cors");
const app = express();
app.use(cors());

var cors_p ={
 origin:"*"


}

app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(3000,()=>{
    console.log("Server Started!")
})

