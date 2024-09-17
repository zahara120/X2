const { db } = require("../config/mongodb");

const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = re.test(String(email).toLowerCase());
  if (!result) {
    throw new Error("Email tidak valid");
  }
};

const isEmpty = (value, name) => {
  if (!value) {
    throw new Error(`${name} is required`);
  }
};

const existingEmail = async (email) => {
  const data = await db.collection("users").findOne({ email });
  if (data) {
    throw new Error("Email sudah digunakan");
  }
};

const isPaswordValid = (password) => {
  if (password.length < 5) {
    throw new Error("Password minimal 5 karakter");
  }
};

const existingUsername = async (username) => {
  const data = await db.collection("users").findOne({ username });
  if (data) {
    throw new Error("Username sudah digunakan");
  }
};

module.exports = {
  isEmail,
  isEmpty,
  existingEmail,
  isPaswordValid,
  existingUsername,
};
