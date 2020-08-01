const db = require('../config/db.js')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
/**
 * 订单表
 */
const MyOrderSchema = new Schema({
    username:String,
    orderArray:Array
});
module.exports = db.model('myorder', MyOrderSchema);