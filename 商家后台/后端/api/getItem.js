let itemServe=require('../serve/itemServe.js')
module.exports=function(app){
    app.get('/getItem', (req, res) => {
        itemServe.getItem(req,res)
    })
}