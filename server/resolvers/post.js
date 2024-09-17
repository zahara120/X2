const { redis } = require("../config/redis");
const Post = require("../models/Post");

const resolvers = {
  Query: {
    getAllPosts: async (_, __, contextValue) => {
      await contextValue.auth();
      const cache = await redis.get("post:all");
      if (cache) {
        // console.log("<<< cache");
        return JSON.parse(cache);
      }
      // console.log("<<< mongodb");
      const data = await Post.getAllPosts();
      await redis.set("post:all", JSON.stringify(data), "EX", 1000);
      return data;
    },

    getPostByAuthorId: async (_, __, contextValue) => {
      const { id } = await contextValue.auth();
      const data = await Post.getPostByAuthorId(id);
      return data;
    },

    getPostById: async (_, args, contextValue) => {
      await contextValue.auth();
      const { id } = args;
      const data = await Post.getPostById(id);
      if (!data) throw new Error("Post not found");
      return data;
    },
  },
  Mutation: {
    createPost: async (_, args, contextValue) => {
      const { id } = await contextValue.auth();
      const newdata = { ...args, authorId: id };
      const data = await Post.createPost(newdata);
      await redis.del("post:all");
      return data;
    },
  },
};

module.exports = resolvers;
