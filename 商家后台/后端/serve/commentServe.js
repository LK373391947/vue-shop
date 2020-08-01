const dbmodel = require('../model/commentModel.js');
const Comment = dbmodel.model('comment');

//添加评论（用户端）
/**
 * 接口文件：api/addComment
 * 接口地址：'/addComment'
 * 方式：；'post'
 * 接收：对象commentForm:{shopname,username,date,message}
 * 返回：error success 字符串
 */
exports.addComment=function(req,res){
    let shopname=req.body.commentForm.shopname;
    let obj={
        username:req.body.commentForm.username,
        date:req.body.commentForm.date,
        message:req.body.commentForm.message
    }
    let comment=new Comment({
        shopname,
        commentArray:[obj]
    })
    Comment.find({shopname:shopname}).then(value=>{
        if(value.length==0) {comment.save(err=>{
            if(err)res.send("error");
            else res.send("success");
        });}
        else{
            Comment.updateMany({shopname:shopname},{'$addToSet': { 'commentArray': obj } },function(err){
                if(err)res.send("error");
                else res.send("success");
            })
        }
    })
}
//获取评论（用户端）
/**
 * 接口文件：api/getComment.js
 * 接口地址：'/getComment'
 * 方式：；'get'
 * 接收：shopname
 * 返回：整个数组
 */
exports.getComment=function(req,res){
    let shopname=req.query.shopname;
    Comment.find({shopname:shopname}).then(value=>{
        res.send(value);
    })
}

//查看评论
