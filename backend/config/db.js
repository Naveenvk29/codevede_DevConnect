import mongoose from "mongoose";

const DB_NAME = "Auth_blog_codeveda";

const connectdb = async () => {
  try {
    const connectInstruct = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `successfully connect with mongodb${connectInstruct.connection.host}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectdb;
