const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')



/**
 *
 * 公共系统初始化
 *
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



//跨域问题解决
app.use(require('cors')());




//api接口调用
require('./api/userLogin.js')(app);
require('./api/userRegister.js')(app);
require('./api/getInfo.js')(app);
require('./api/addItem.js')(app);
require('./api/getItem.js')(app);
require('./api/getShop.js')(app);
require('./api/updateItem.js')(app);
require('./api/deleteItem.js')(app);
require('./api/addOrder.js')(app);
require('./api/getOrder.js')(app);
require('./api/getMyOrder.js')(app);
require('./api/addComment.js')(app);
require('./api/getComment.js')(app);

app.get('/', (req, res) => res.send('Hello World!'))




app.listen(port, () => console.log(`Example app listening on port ${port}!`))