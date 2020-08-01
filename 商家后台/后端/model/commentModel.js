const db = require('../config/db.js')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
/**
 * 订单表
 */
const CommentSchema = new Schema({
    shopname:String,
    commentArray:Array
});
module.exports = db.model('comment', CommentSchema);