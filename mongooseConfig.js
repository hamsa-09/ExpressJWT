const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config();
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connecting mongoDb done");
    }
    catch(err){
        console.log("Connecting mongoDb failing")
    }
}
module.exports = connectDB;
