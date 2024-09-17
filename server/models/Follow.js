const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");

class Follow {
  static async following(followingId, followerId) {
    // console.log(followingId, followerId, "<<< followingId, followerId");

    if (followingId == followerId) throw new Error("You can't follow yourself");

    await this.checkFollowing(followingId, followerId);

    await db.collection("follows").insertOne({
      followingId: new ObjectId(String(followingId)),
      followerId: new ObjectId(String(followerId)),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return "berhasil following";
  }

  static async checkFollowing(followingId, followerId) {
    const data = await db.collection("follows").findOne({
      followingId: new ObjectId(String(followingId)),
      followerId: new ObjectId(String(followerId)),
    });

    if (data) {
      throw new Error("You already follow this user");
    }
  }

  static async unfollowing(followingId, followerId) {
    await db.collection("follows").deleteOne({
      followingId: new ObjectId(String(followingId)),
      followerId: new ObjectId(String(followerId)),
    });
    return "berhasil unfollowing";
  }
}

module.exports = Follow;
