const { db } = require("../config/mongodb");
const { isEmail } = require("../helpers/validation");
const User = require("../models/User");

const resolvers = {
  Query: {
    users: async (_, args, contextValue) => {
      await contextValue.auth();
      const data = await User.getAllUser(args);
      return data;
    },
    getUserById: async (_, __, contextValue) => {
      const { id } = await contextValue.auth();
      const data = await User.getUserById(id);
      if (!data) throw new Error("User not found");
      return data;
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { name, username, email, password } = args;
      await User.addUser(name, username, email, password);
      return "berhasil register";
    },
    login: async (_, args) => {
      const { email, password } = args;
      const user = await User.login(email, password);
      return user;
    },
  },
};

module.exports = resolvers;
