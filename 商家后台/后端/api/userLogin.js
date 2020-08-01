let userServe=require('../serve/userServe.js')
module.exports=function(app){
    app.post('/userLogin', (req, res) => {
        userServe.userLogin(req,res)
    })
}