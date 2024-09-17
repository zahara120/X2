const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");

class Like {
  static async likePost(payload) {
    const { username, postId } = payload;
    const filter = { _id: new ObjectId(String(postId)) };
    const updateDoc = {
      $push: {
        likes: {
          username,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };

    await db.collection("posts").updateOne(filter, updateDoc);
    return "berhasil like post";
  }
}
module.exports = Like;
