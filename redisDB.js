const redis=require("redis");

const redisClient=redis.createClient();

redisClient.connect();

redisClient.on("connect",()=>{
    console.log("Redis connected successfully");
});

redisClient.on("error",()=>{
    console.log("Redis not Connected");
});

module.exports=redisClient;
