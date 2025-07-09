const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config();
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://hamsavardhinibaskar:hamsaHamsa@cluster0.wirc1dw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connecting mongoDb done");
    }
    catch(err){
        console.log("Connecting mongoDb failing")
    }
}
module.exports = connectDB;
