const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://faizfavaz7_db_user:Fafa4646@faizfavaz4646.l4enmaq.mongodb.net/devTinder"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;
