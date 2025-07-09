const redis=require("redis");

const redisClient=redis.createClient('redis://red-d1n8ufemcj7s73br8ll0:6379');

redisClient.connect();

redisClient.on("connect",()=>{
    console.log("Redis connected successfully");
});

redisClient.on("error",()=>{
    console.log("Redis not Connected");
});

module.exports=redisClient;
