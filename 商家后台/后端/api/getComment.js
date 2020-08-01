const commentServe=require('../serve/commentServe')
module.exports=function(app){
    app.get('/getComment',(req,res)=>{
        commentServe.getComment(req,res);
    })
}