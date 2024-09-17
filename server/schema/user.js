const typeDefs = `#graphql
    type User {
      _id: String
      name: String
      username: String!
      email: String!
      password: String!
      followers: [Follow]
      following: [Follow]
    }
    type Query {
      users(keyword: String): [User],
      getUserById: User
    },
    type Mutation {
      register(name: String, username: String, email: String, password: String): String
      login(email: String, password: String): String
    }
  `;

module.exports = typeDefs;
