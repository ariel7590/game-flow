"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.getUserById = exports.getAllUsers = exports.saveGoogleAccount = exports.findUserByEmail = exports.isUserExists = void 0;
const users_model_1 = require("../../models/users/users.model");
const DEFAULT_USER_ID = 0;
async function getLatestUserId() {
    const latestUser = await users_model_1.userModel.findOne().sort("-userId");
    if (!latestUser) {
        return DEFAULT_USER_ID;
    }
    return latestUser.userId;
}
async function isUserExists(userName) {
    return await users_model_1.userModel.findOne({
        userName,
    }, { _id: 0, __v: 0, salt: 0 });
}
exports.isUserExists = isUserExists;
async function findUserByEmail(userEmail) {
    return await users_model_1.userModel.findOne({
        email: userEmail,
    }, { _id: 0, __v: 0 });
}
exports.findUserByEmail = findUserByEmail;
async function saveAccount(user) {
    await users_model_1.userModel.findOneAndUpdate({
        userId: user.userId,
    }, user, { upsert: true });
}
async function saveGoogleAccount(user) {
    await users_model_1.userModel.findOneAndUpdate({
        email: user.email,
    }, user, { upsert: true });
}
exports.saveGoogleAccount = saveGoogleAccount;
async function getAllUsers() {
    return await users_model_1.userModel.find({}, { _id: 0, __v: 0, password: 0, salt: 0, active: 0 });
}
exports.getAllUsers = getAllUsers;
async function getUserById(id) {
    if (typeof id === "number") {
        return await users_model_1.userModel.findOne({ userId: id }, { _id: 0, __v: 0, password: 0, salt: 0, active: 0 });
    }
    else {
        return await users_model_1.userModel.findOne({ googleId: id }, { _id: 0, __v: 0, password: 0, salt: 0, active: 0 });
    }
}
exports.getUserById = getUserById;
async function createNewUser(user) {
    const newUserId = (await getLatestUserId()) + 1;
    const newUser = { userId: newUserId, ...user, active: true };
    await saveAccount(newUser);
    return newUserId;
}
exports.createNewUser = createNewUser;
