let itemServe=require('../serve/itemServe.js')
module.exports=function(app){
    app.post('/updateItem', (req, res) => {
        itemServe.updateItem(req,res)
    })
}