import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const connectInstruct = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `✅ Successfully connected to MongoDB: ${connectInstruct.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectdb;
