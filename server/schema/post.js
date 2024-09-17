const typeDefs = `#graphql
    type Post {
        _id: String
        content: String!
        tags: [String]
        imgUrl: String
        authorId: String!
        comments: [Comment]
        likes: [Like]
        author: User
        createdAt: String
        updatedAt: String
    },
    type Query {
        posts: [Post]
        getAllPosts: [Post]
        getPostByAuthorId: [Post]
        getPostById(id: String!): Post
    },
    type Mutation {
        createPost(
            content: String!,
            tags: [String],
            imgUrl: String
        ): String
    }
`;

module.exports = typeDefs;
