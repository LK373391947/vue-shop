let itemServe=require('../serve/itemServe.js')
module.exports=function(app){
    app.post('/deleteItem', (req, res) => {
        itemServe.deleteItem(req,res)
    })
}