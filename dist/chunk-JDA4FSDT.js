"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/models/mongoDB/user.ts
var _mongoose = require('mongoose');
var userSchema = new (0, _mongoose.Schema)(
  {
    email: {
      type: String,
      unique: true
    },
    userId: {
      type: String,
      unique: true,
      required: false
    },
    name: String,
    phone: String,
    role: String,
    address: String,
    ABN: String,
    password: String,
    isEmailVerified: Boolean,
    isUserVerified: Boolean,
    disabled: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }
);
var userModel = _mongoose.model.call(void 0, "User", userSchema);
var findUser = async (email) => {
  return await userModel.findOne({
    email
  });
};
var isUserExist = async (email) => {
  const user = await userModel.findOne({ email, role: { $in: ["User", "Agent"] } }, "name");
  return user ? user : null;
};
async function updateUserPassword(email, newPassword) {
  await userModel.updateOne(
    { email },
    { $set: { password: newPassword } }
  );
}
var createUser = async (data) => {
  const userCount = await userModel.countDocuments({ userId: { $regex: /^IAMI/ } });
  let newUserId = userCount + 1;
  let userExisted = true;
  let retry = 0;
  while (userExisted && retry < 20) {
    try {
      const id = data.isUserVerified ? `IAMI${String(newUserId).padStart(4, "0")}` : `Agent${String(newUserId)}`;
      userExisted = false;
      return await userModel.create({
        ...data,
        userId: id
      });
    } catch (error) {
      if (error.code === 11e3) {
        userExisted = true;
        newUserId += 1;
      }
      retry += 1;
    }
  }
};
var getUserByRole = async (role, page, limit = 10) => {
  const skip = (page - 1) * limit;
  const excludeField = role !== "Agent" ? "-password -role -isEmailVerified -isUserVerified -__v -_id" : "-password -role -isEmailVerified -__v -_id";
  const users = await userModel.find({ role }, excludeField).sort({ isUserVerified: 1, createdAt: -1 }).skip(skip).limit(limit);
  return users;
};
var getUserByRoleFilterUsingEmail = async (role, email) => {
  const excludeField = role !== "Agent" ? "-password -role -isEmailVerified -isUserVerified -__v -_id" : "-password -role -isEmailVerified -__v -_id";
  const users = await userModel.findOne({ role, email }, excludeField);
  return users;
};
var getAllUsers = async (page, limit = 10) => {
  const skip = (page - 1) * limit;
  const users = await userModel.find({}, "-password -__v -_id").skip(skip).limit(limit).sort({ createdAt: -1 });
  return users;
};










exports.userModel = userModel; exports.findUser = findUser; exports.isUserExist = isUserExist; exports.updateUserPassword = updateUserPassword; exports.createUser = createUser; exports.getUserByRole = getUserByRole; exports.getUserByRoleFilterUsingEmail = getUserByRoleFilterUsingEmail; exports.getAllUsers = getAllUsers;
//# sourceMappingURL=chunk-JDA4FSDT.js.map