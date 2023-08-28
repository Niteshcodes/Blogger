import mongoose from "mongoose";


export default function dbConnector(url: string) {
  mongoose.connect(url).then(()=>{
    console.log("⚡️[database]:Database connected successfully")
  });
}

// module.exports ={dbConnector}