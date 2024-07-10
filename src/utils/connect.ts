import mongoose from "mongoose";
import config from "config";


 async function connect (){
    const dbUri = config.get<string>("dbUri");
return mongoose.connect(dbUri,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
   
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Could not connect to MongoDB");
    console.log(err);
    process.exit(1);
    // existed wiuth an error

})
}

export default connect;