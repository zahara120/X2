const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");
const { isEmpty } = require("../helpers/validation");

class Comment {
  static async addComment(payload) {
    const { content, postId, username } = payload;
    isEmpty(content, "comment");

    const filter = { _id: new ObjectId(String(postId)) };
    const updateDoc = {
      $push: {
        comments: {
          content,
          username,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };

    await db.collection("posts").updateOne(filter, updateDoc);
    return "berhasil menambahkan komentar";
  }
}

module.exports = Comment;
