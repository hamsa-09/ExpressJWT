const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();

const verifyjwt=async(req,res,next)=>{
    try{
        // const authHeader=req.header('Authorization');

        // if(!authHeader){
        //     return res.status(500).json({ok:false,message:"Token is missing"});
        // }
        const token=req.cookies.cookie
        // const token=authHeader.split(' ')[1]
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded){
            return res.status(500).json({ok:false,message:"Invalid token"});
        }
        req.user=decoded
        next()
    }
    catch(error){
        return res.status(500).json({ok:false,message:error.message});
    }
}
module.exports=verifyjwt;
