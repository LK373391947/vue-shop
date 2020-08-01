const dbmodel = require('../model/itemModel.js');
const Item = dbmodel.model('item');
//商品页面的业务逻辑


//添加商品
/**
 * 接口文件：api/addItem
 * 接口地址：'/addItem'
 * 方式：；'post'
 * 接收：对象obj:{shopname,name,price,describe,category,number}
 * 返回：error success 字符串
 */
exports.addItem = function (req, res) {
    let username = req.body.username;
    let shopname = req.body.shopname;
    let obj = {
        name: req.body.name,
        price: req.body.price,
        describe: req.body.describe,
        number: 0,
        category: req.body.category,
        itemnumber: 0
    }
    let item = new Item({
        username: username,
        shopname: shopname,
        itemArray: [obj]
    });
    //先根据商户名去寻找是否有该商户的商品表（即是否为新用户）
    Item.find({ username: username }).then(value => {
        //若为新用户则先创建document，直接save
        if (value.length == 0) {
            item.save(function (err) {
                if (err) res.send("error");
                else res.send("success");
            });
        }
        //若不是则往itemArray中插入新增加的商品
        else {
            Item.updateMany({ username: username }, { '$addToSet': { 'itemArray': obj } }, function (err) {
                if (err) res.send("error");
                else res.send("success");
            })
        }
    })

}


//获取列表
/**
 * 接口文件：api/getItem
 * 接口地址：'/getItem'
 * 方式：；'get'
 * 接收：对象obj:{shopname}
 * 返回：数组 itemArray
 */
exports.getItem = function (req, res) {
    let username = req.query.username;
    Item.find({ username: username }).then(value => {
        if (value.length == 0) res.send([]);
        else res.send(value[0].itemArray);
    })
}


//更新商品
/**
 * 接口文件：api/updateItem
 * 接口地址：'/updateItem'
 * 方式：；'post'
 * 接收：对象updateForm
 * 返回：string error和success
 */
exports.updateItem = function (req, res) {
    let username = req.body.username;
    let name = req.body.name;
    let price = req.body.price;
    let describe = req.body.describe;
    let category = req.body.category;
    Item.updateOne({ username: username, "itemArray.name": name }, { "itemArray.$.price": price, "itemArray.$.describe": describe, "itemArray.$.category": category },
        function (err) {
            if (err) res.send("error");
            else res.send("success");
        })
}


//删除商品
/**
 * 接口文件：api/deleteItem
 * 接口地址：'/deleteItem'
 * 方式：；'post'
 * 接收：对象{name,username}
 * 返回：string error和success
 */
exports.deleteItem = function (req, res) {
    let username = req.body.username;
    let name = req.body.name;
    Item.updateMany({ username: username }, { '$pull': { 'itemArray': { name: name } } }, function (err) {
        if (err) res.send("error");
        else res.send("success");
    })
}