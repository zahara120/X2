const Follow = require("../models/Follow");

const resolvers = {
  Mutation: {
    following: async (_, args, contextValue) => {
      const { id } = await contextValue.auth();
      const { followingId } = args;

      const result = await Follow.following(followingId, id);
      return result;
    },
    unfollowing: async (_, args, contextValue) => {
      const { id } = await contextValue.auth();
      const { followingId } = args;

      const result = await Follow.unfollowing(followingId, id);
      return result;
    },
  },
};

module.exports = resolvers;
