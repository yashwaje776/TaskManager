import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};
