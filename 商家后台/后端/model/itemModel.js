const db = require('../config/db.js')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
/**
 * 商品表
 */
const ItemSchema = new Schema({
    username:String,
    shopname:String,
    itemArray:Array
});
module.exports = db.model('item', ItemSchema);