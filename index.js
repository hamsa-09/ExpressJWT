const express=require('express');
const app=express();
const Userroutes=require('./Router');
const cookieParser=require('cookie-parser')
const connectDB=require('./mongooseConfig')

app.use(express.json())
app.use(cookieParser())
app.use('/api',Userroutes)

const port=process.env.PORT || 5000
connectDB();
app.listen(port,()=>{
    console.log(`Server is running in the port : ${port}`)
})
