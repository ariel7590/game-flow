"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.getUserById = exports.getAllUsers = exports.findUserByEmail = exports.isUserExists = void 0;
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
    try {
        return await users_model_1.userModel.findOne({
            userName
        }, { _id: 0, __v: 0, salt: 0 });
    }
    catch (err) {
        console.error(err);
    }
}
exports.isUserExists = isUserExists;
async function findUserByEmail(userEmail) {
    try {
        return await users_model_1.userModel.findOne({
            email: userEmail,
        }, { _id: 0, __v: 0 });
    }
    catch (err) {
        console.error(err);
    }
}
exports.findUserByEmail = findUserByEmail;
async function saveAccount(user) {
    try {
        await users_model_1.userModel.findOneAndUpdate({
            userId: user.userId,
        }, user, { upsert: true });
    }
    catch (err) {
        console.error(err);
    }
}
async function getAllUsers() {
    try {
        return await users_model_1.userModel.find({}, { _id: 0, __v: 0, password: 0, salt: 0, active: 0 });
    }
    catch (err) {
        console.error(err);
    }
}
exports.getAllUsers = getAllUsers;
async function getUserById(userId) {
    try {
        return await users_model_1.userModel.findOne({ userId: userId }, { _id: 0, __v: 0, password: 0, salt: 0, active: 0 });
    }
    catch (err) {
        console.error(err);
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
