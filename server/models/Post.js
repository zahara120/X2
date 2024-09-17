const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");
const { isEmpty } = require("../helpers/validation");
class Post {
  static async getAllPosts() {
    const agg = [
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "author.password": 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    const data = await db.collection("posts").aggregate(agg).toArray();
    return data;
  }

  static async getPostByAuthorId(id) {
    const agg = [
      {
        $match: {
          authorId: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $project: {
          "author.password": 0,
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    const data = await db.collection("posts").aggregate(agg).toArray();
    // console.log(data[0], "<<< data");
    return data;
  }
  static async getPostById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $project: {
          "author.password": 0,
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const data = await db.collection("posts").aggregate(agg).toArray();
    // console.log(data[0], "<<< data");
    return data[0];
  }

  static async createPost(payload) {
    payload.createdAt = new Date();
    payload.updatedAt = new Date();
    payload.authorId = new ObjectId(String(payload.authorId));
    payload.comments = [];
    payload.likes = [];

    isEmpty(payload.content, "content");

    await db.collection("posts").insertOne(payload);
    return "berhasil menambahkan post";
  }
}

module.exports = Post;
