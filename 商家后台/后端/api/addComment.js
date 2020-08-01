const commentServe=require('../serve/commentServe');
module.exports=function(app){
    app.post('/addComment',(req,res)=>{
        commentServe.addComment(req,res);
    })
}