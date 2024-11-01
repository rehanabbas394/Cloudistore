const mongoose = require("mongoose")

async function connectdb(){
    try{
        await mongoose.connect("mongodb://localhost:27017/Form")
        console.log("MongoDB connected successfully")
    }
    catch(error){
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectdb