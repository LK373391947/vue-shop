const dbmodel = require('../model/orderModel.js');
const dbModel=require('../model/myOrderModel.js');
const Order = dbmodel.model('order');
const MyOrder=dbModel.model('myorder');
//订单相关的业务逻辑


//获取订单
/**
 * 接口文件：api/getOrder
 * 接口地址：'/getOrder'
 * 方式：；'get'
 * 接收：shopname
 * 返回：所有订单集成的数组
 */
exports.getOrder=function(req,res){
    let shopname=req.query.shopname;
    Order.find({shopname:shopname}).then(value =>{
        res.send(value);
    })
}



//用户下单（用户端）
/**
 * 接口文件：api/addOrder
 * 接口地址：'/addOrder'
 * 方式：；'post'
 * 接收：对象:addForm:{shopname,user(对象),cart(数组),total,date}
 * 返回：error success 字符串
 */
exports.addOrder = function (req, res) {
    let shopname = req.body.addForm.shopname;
    let user = req.body.addForm.user;
    let username=user.username;
    let date = req.body.addForm.date;
    let total = req.body.addForm.total;
    let cart = req.body.addForm.cart;
    let comment=req.body.addForm.comment;
    let obj={
        user,
        date,
        total,
        cart,
        comment
    };
    let order = new Order({
        shopname,
        orderArray: [
            obj
        ]
    });
    let myObj={
        date,cart,total,comment,shopname
    };
    let myOrder=new MyOrder({
        username,
        orderArray:[
            myObj
        ]
    });
    let bool1=true;
    let bool2=true;
    Order.find({ shopname: shopname }).then(value => {
        if (value.length == 0) order.save(function(err){
            if(err)bool1=false;
        });
        else{
            Order.updateMany({ shopname: shopname }, { '$addToSet': { 'orderArray': obj } }, function (err) {
                if (err) bool1=false;
            })
        }
    });
    MyOrder.find({ username: username }).then(value => {
        if (value.length == 0) myOrder.save(function(err){
            if(err)bool2=false;
        });
        else{
            MyOrder.updateMany({ username: username }, { '$addToSet': { 'orderArray': myObj } }, function (err) {
                if (err) bool2=false;
            })
        }
    });
    if(bool1==true&&bool2==true)res.send("success");
    else res.send("error");
}


//用户查看历史订单
/**
 * 接口文件：api/getMyOrder
 * 接口地址：'/getMyOrder'
 * 方式：；'get'
 * 接收：username
 * 返回：所有订单集成的数组
 */
exports.getMyOrder = function (req, res){
    let username=req.query.name;
    MyOrder.find({username:username}).then(value=>{
        res.send(value);
    })
}