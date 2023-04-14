const app = require("./app");
const mongoose = require("mongoose").set("strictQuery", true);
require("dotenv").config();
const { HOST_DB } = process.env;

const connectDb = async () => {
  try {
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

connectDb();
