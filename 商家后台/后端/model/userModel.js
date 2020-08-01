const db = require('../config/db.js')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
/**
 * 用户表
 */
const UserSchema = new Schema({
    username: String,
    shopname: String,
    password: String,
    describe: String,
    address: String,
    telephone: String,
    category: String
});
module.exports = db.model('user', UserSchema);