const orderServe=require('../serve/orderServe');
module.exports=function(app){
    app.get('/getMyOrder',(req,res)=>{
        orderServe.getMyOrder(req,res);
    })
}