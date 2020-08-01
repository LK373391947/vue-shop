const dbmodel = require('../model/userModel.js');
const User = dbmodel.model('user');
//业务逻辑

/**
 * 
 * 后台业务逻辑
 */

//登录
/**
 * 接口文件：api/userLogin
 * 接口地址：'/userLogin'
 * 方式：；'post'
 * 接收：对象obj:{username,password}
 * 返回：经过查询到的对象
 */
exports.userLogin = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.find({ username: username, password: password }).then(value => {
        res.send(value);
    })
}


//注册
/**
 * 接口文件：api/userRegister
 * 接口地址：'/userRegister'
 * 方式：post
 * 接收：对象obj：{username,shopname,password,describe,address,telephone,category}
 * 发送：String类型字符串，成功success失败error
 */
exports.userRegister = function (req, res) {
    let obj = new User({
        username: req.body.username,
        shopname: req.body.shopname,
        password: req.body.password,
        describe: req.body.describe,
        address: req.body.address,
        telephone: req.body.telephone,
        category: req.body.category
    });
    obj.save(function (err) {
        if (err) res.send("error");
        else res.send("success");
    })
}


//基本信息页面的信息获取
/**
 * 接口文件：api/getInfo
 * 接口地址：'/getInfo'
 * 方式：post
 * 接收：对象obj：{shopname}
 * 发送：用户包含的整个对象
 */
exports.getInfo=function(req,res){
    let username=req.body.username;
    User.find({username:username}).then(value=>{
        res.send(value);
    })
}

//----------------------------------------------------------------------------
/**
 * 外卖端业务逻辑
 */
//获取商家（首页显示）
/**
 * 接口文件：api/getShop
 * 接口地址：'/getShop'
 * 方式：get
 * 接收：无
 * 发送：用户包含的整个对象
 */
exports.getShop=function(req,res){
    User.find().then(value=>{
        res.send(value);
    })
}