const typeDefs = `#graphql
    type Follow {
        followingId: String
        followerId: String
        createdAt: String
        updatedAt: String
        name: String
        username: String
    }
    type Mutation{
        following(followingId: String!): String
        unfollowing(followingId: String!): String
    }
`;

module.exports = typeDefs;
