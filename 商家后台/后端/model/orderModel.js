const db = require('../config/db.js')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
/**
 * 订单表
 */
const OrderSchema = new Schema({
    shopname:String,
    orderArray:Array
});
module.exports = db.model('order', OrderSchema);