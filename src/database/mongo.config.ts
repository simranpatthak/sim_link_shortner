// database connection configuration

import mongoose from "mongoose";

export function connect (){
    mongoose.connect(process.env.MONGO_URL as string,{
        tls: true,

    }).then(()=>{
        console.log("Database connected")
    }).catch((err)=>{   
        console.log("Database connection failed ",err);
        
    })

}