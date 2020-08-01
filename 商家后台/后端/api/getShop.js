let userServe=require('../serve/userServe.js')
module.exports=function(app){
    app.get('/getShop', (req, res) => {
        userServe.getShop(req,res)
    })
}