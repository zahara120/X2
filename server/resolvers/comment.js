const { redis } = require("../config/redis");
const Comment = require("../models/Comment");

const resolvers = {
  Mutation: {
    addComment: async (_, args, contextValue) => {
      const { username } = await contextValue.auth();
      const { content, postId } = args;

      const result = await Comment.addComment({
        content,
        postId,
        username,
      });

      await redis.del("post:all");

      return result;
    },
  },
};

module.exports = resolvers;
