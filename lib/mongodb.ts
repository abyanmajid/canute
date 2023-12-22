import mongoose from "mongoose";

async function connectMongoDB() {
  const mongoDB_URI = process.env.MONGODB_URI;
  if (!mongoDB_URI) {
    throw new Error(
      "<!> MONGODB_URI is not defined in the environment variables."
    );
  }

  try {
    await mongoose.connect(mongoDB_URI);
    console.log("[*] Successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
}

export default connectMongoDB;
