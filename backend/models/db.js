require("dotenv").config(); // Load environment variables from .env file

const db = require("mongoose");

db.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.mongodb.net/${process.env.DB_NAME}`
); 

const userSchema = db.Schema({
  username: String,
  password: String,
});

const users = db.model("users", userSchema);

module.exports = {
  users: users,
};
