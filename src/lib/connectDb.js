// src/lib/db.js
import mongoose from "mongoose";
const connection={}

async function dbConnect(){
  if(connection.isConnected){
    console.log("Already connected to database");
    return;
  }

  try {
    const Db= await mongoose.connect(process.env.MONGO_URI || "",{});
    connection.isConnected= Db.connections[0].readyState
    console.log("db connectd successfully")
  } catch (error) {
    console.log("databse connection fail",error)
    process.exit(1);
  }
}
export default dbConnect;


