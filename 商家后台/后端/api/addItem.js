let itemServe=require('../serve/itemServe.js')
module.exports=function(app){
    app.post('/addItem', (req, res) => {
        itemServe.addItem(req,res)
    })
}