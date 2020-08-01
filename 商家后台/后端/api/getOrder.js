const orderServe=require('../serve/orderServe');
module.exports=function(app){
    app.get('/getOrder',(req,res)=>{
        orderServe.getOrder(req,res);
    })
}