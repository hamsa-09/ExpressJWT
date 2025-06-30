const User = require('./User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const redisClient=require('./redisDB');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);
        const existing = await User.findOne({ email: email });
        if (existing) {
            return res
                .status(400)
                .json({ ok: false, message: 'User already registered' });
        }
        const newUser = new User({
            name,
            email,
            password: hashpassword,
        });
        await newUser.save();
        return res
            .status(201)
            .json({ ok: true, message: 'Registered successfully' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};
const userLogin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email: email });
        if (!existing) {
            return res
                .status(400)
                .json({ ok: false, message: 'User not existing' });
        }
        const matchpassword = await bcrypt.compare(
            password,
            existing.password
        );
        if (!matchpassword) {
            return res
                .status(400)
                .json({ ok: false, message: 'Password not matched' });
        }
        const payload = {
            id: existing._id,
            name: existing.name,
            email: existing.email,
        };
        const jwttoken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '30m'});
         res.cookie("cookie",jwttoken,{
            httpOnly:true,
            secure:false,
            sameSite:'Lax',
            path:'/',
            maxAge:3600*1000
        })
        return res.status(200).json({
            ok: true,
            message:"Login successfull",
            user: {
                id: existing._id,
                name: existing.name,
                email: existing.email,
            },
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const { name, age } = req.body;
        const newUser = new User({
            name,
            age,
        });
        await newUser.save();
        return res.status(200).json({
            ok: true,
            message: 'New User Created',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};
const getUser = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');
        return res.status(200).json({
            ok: true,
            user: allUsers,
        });
    } catch (error) {
        return res.status(500).json({
            key: false,
            message: error.message,
        });
    }
};
const getByUserId = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);
        return res.status(200).json({
            ok: true,
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, age } = req.body;
        const existingUser = await User.findById(_id);
        existingUser.name = name || existingUser.name;
        existingUser.age = age || existingUser.age;
        await existingUser.save();
        return res.status(200).json({
            ok: true,
            user: existingUser,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};
const deleteByUserId = async (req, res) => {
    try {
        const { _id } = req.params;
        const deleteuser = await User.findByIdAndDelete(_id);
        return res.status(200).json({
            ok: true,
            user: deleteuser,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};
const dummy=async(req,res)=>{
    try {
        const cachedKey="comment"
        const cached=await redisClient.get(cachedKey);
        if(cached){
            return res.status(200).json({
                message:"From Redis Cache",
                comment:JSON.parse(cached)
            })
        }
    const response = await fetch('https://dummyjson.com/comments');

    const data = await response.json();
    redisClient.setEx(cachedKey,20,JSON.stringify(data));
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
module.exports = {
    register,
    userLogin,
    addUser,
    getUser,
    getByUserId,
    updateUser,
    deleteByUserId,
    dummy
};
