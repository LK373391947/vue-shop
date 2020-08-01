let userServe=require('../serve/userServe.js')
module.exports=function(app){
    app.post('/getInfo', (req, res) => {
        userServe.getInfo(req,res)
    })
}