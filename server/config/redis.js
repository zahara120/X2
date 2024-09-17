if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Redis = require("ioredis");
const redis = new Redis({
  port: 12148, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

module.exports = { redis };
