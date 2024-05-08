import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("Database is already connected...");
        return;
    }

    await mongoose.connect('mongodb://127.0.0.1:27017/notesApplication').then(() => {
        console.log("Database connected successfully...");
    }).catch((error) => {
        console.log("Database connection failed...");
        console.log(error.message);
    })
}

export default dbConnect;