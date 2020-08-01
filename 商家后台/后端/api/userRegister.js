let userServe=require('../serve/userServe.js')
module.exports=function(app){
    app.post('/userRegister', (req, res) => {
        userServe.userRegister(req,res)
    })
}