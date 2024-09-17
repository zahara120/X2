const { redis } = require("../config/redis");
const Like = require("../models/Like");

const resolvers = {
  Mutation: {
    likePost: async (_, args, contextValue) => {
      const { username } = await contextValue.auth();
      const { postId } = args;

      const response = Like.likePost({ username, postId });
      await redis.del("post:all");
      return response;
    },
  },
};

module.exports = resolvers;
