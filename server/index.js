const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userResolvers = require("./resolvers/user");
const userTypeDefs = require("./schema/user");
const postResolvers = require("./resolvers/post");
const postTypeDefs = require("./schema/post");
const commentTypeDefs = require("./schema/comment");
const likeTypeDefs = require("./schema/like");
const followTypeDefs = require("./schema/follow");
const commentResolvers = require("./resolvers/comment");
const followResolvers = require("./resolvers/follow");
const likeResolvers = require("./resolvers/like");
const User = require("./models/User");
const { verifytoken } = require("./helpers/jwt");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const server = new ApolloServer({
  typeDefs: [
    userTypeDefs,
    postTypeDefs,
    commentTypeDefs,
    likeTypeDefs,
    followTypeDefs,
  ],
  resolvers: [
    userResolvers,
    postResolvers,
    commentResolvers,
    followResolvers,
    likeResolvers,
  ],
  introspection: true,
});
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    // listen: { port: 3000 },
    listen: process.env.PORT || 3000,
    context: ({ req, res }) => {
      return {
        auth: async () => {
          const accessToken = req.headers.authorization;
          if (!accessToken) throw new Error("Invalid token");

          // console.log(accessToken, "<<< accessToken");
          const [bearer, token] = accessToken.split(" ");
          if (bearer !== "Bearer") throw new Error("Invalid token");

          const payload = verifytoken(token);

          // console.log(payload, "<<< payload");

          const user = await User.getUserById(payload.id);
          if (!user) throw new Error("Invalid token");

          // console.log(user, "<<< user");
          return payload;
        },
        authorization: (async = () => {
          const userId = req.user.id;
          return userId;
        }),
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
