const typeDefs = `#graphql
    type Like {
        username: String!
        createdAt: String
        updatedAt: String
    },
    type Mutation {
        likePost(postId: String!): String
    }
`;

module.exports = typeDefs;