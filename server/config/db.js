const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is missing from .env");
    }

    const parsedUri = new URL(uri);

    console.log("MongoDB username:", parsedUri.username);
    console.log("MongoDB hostname:", parsedUri.hostname);
    console.log("MongoDB password present:", parsedUri.password.length > 0);

    await mongoose.connect(uri);

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;