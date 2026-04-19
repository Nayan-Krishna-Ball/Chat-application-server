//

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

//connection state
const db = mongoose.connection;

//check connection
db.on("connected", () => {
  console.log("Connected to database");
});

//check for db errors
db.on("error", (err) => {
  console.error("Database connection error:", err);
});

module.exports = db;
