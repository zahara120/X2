const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signtoken } = require("../helpers/jwt");
const {
  isEmail,
  isEmpty,
  existingEmail,
  isPaswordValid,
  existingUsername,
} = require("../helpers/validation");

class User {
  static async addUser(name, username, email, password) {
    const data = {
      name,
      username,
      email,
      password,
    };

    isEmpty(username, "username");
    isEmpty(email, "email");
    isEmpty(password, "password");

    // ? Cek email udah ada?
    await existingEmail(email);

    // ? cek email valid?
    isEmail(email);

    // ? password minimal 5 karakter?
    isPaswordValid(password);

    // ? Cek username udah ada?
    await existingUsername(username);

    data.password = hashPassword(data.password);

    await db.collection("users").insertOne(data);
    return "berhasil register";
  }

  static async getAllUser(payload) {
    const { keyword } = payload;

    const agg = [
      {
        $match: {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { username: { $regex: keyword, $options: "i" } },
          ],
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "followerId",
                foreignField: "_id",
                as: "userDetail",
              },
            },
            {
              $unwind: "$userDetail",
            },
            {
              $project: {
                userId: "$userDetail._id",
                name: "$userDetail.name",
                username: "$userDetail.username",
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "followingId",
                foreignField: "_id",
                as: "userDetail",
              },
            },
            {
              $unwind: "$userDetail",
            },
            {
              $project: {
                _id: "$userDetail._id",
                name: "$userDetail.name",
                username: "$userDetail.username",
              },
            },
          ],
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ];

    const result = await db.collection("users").aggregate(agg).toArray();
    return result;
  }

  static async login(email, password) {
    isEmpty(email, "email");
    isEmpty(password, "password");

    const user = await db.collection("users").findOne({
      email,
    });
    if (!user) {
      return new Error("User not found");
    }

    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      return new Error("Invalid password");
    }

    const token = signtoken({
      id: user._id,
      username: user.username,
    });

    return token;
  }

  static async getUserById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $project: {
          password: 0,
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "followerId",
                foreignField: "_id",
                as: "userDetail",
              },
            },
            {
              $unwind: "$userDetail",
            },
            {
              $project: {
                _id: "$userDetail._id",
                name: "$userDetail.name",
                username: "$userDetail.username",
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "followingId",
                foreignField: "_id",
                as: "userDetail",
              },
            },
            {
              $unwind: "$userDetail",
            },
            {
              $project: {
                _id: "$userDetail._id",
                name: "$userDetail.name",
                username: "$userDetail.username",
              },
            },
          ],
        },
      },
    ];
    const result = await db.collection("users").aggregate(agg).toArray();
    // console.log(result[0], "<<< result");

    return result[0];
  }
}

module.exports = User;
