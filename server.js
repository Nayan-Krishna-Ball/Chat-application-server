//
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT_NUMBER || 3000;
const db = require("./config/dbConfig");

const server = require("./app");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
