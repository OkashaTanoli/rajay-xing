import mongoose from "mongoose";



export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log("connection successful");
    }
    catch (err) {
        console.log(err);

    }
}

