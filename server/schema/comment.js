const typeDefs = `#graphql
    type Comment {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }
    type Mutation{
        addComment(content: String, postId: String): String!
    }
`;

module.exports = typeDefs;