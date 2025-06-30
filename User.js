const mongoose=require('mongoose')
const userSchema=new  mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
    // name:{
    //     type:String
    // },
    // age:{
    //     type:String
    // }
})
module.exports=mongoose.model('User',userSchema)

// bcrypt - hash library, asyncchronous function (password,how many to hash)
//  bcrpt version. cost factor.salt key.hashed value of password
// to check pass comapre method db password and user pass - hasshed pass unique value salt -pass add salt, if same
// 0 null false ->boolean
// json web token,payload - data,
// jwt sign 3 para (payload,secret key,expires in 30m means minutes) -not async
//  jwt is a bearer token , http request has[ header body params queires cookies]
//header has many keys authori is a key that has value that is a bearer token
// authhead -> gives bearer token should verify without bearer word so we split in jwt but if we use cookies there is no need to split and no to store in local storage in frontend
