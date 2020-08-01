const orderServe=require('../serve/orderServe');
module.exports=function(app){
    app.post('/addOrder',(req,res)=>{
        orderServe.addOrder(req,res);
    })
}