const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routerUser = require("./router/users")
const routerBook = require('./router/books.js')
const path=require('path')
require('dotenv').config({ path: '.env' })
const cookieParser=require('cookie-parser')
const ImageModel = require('./model/image')
const app = express();
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({ origin: true, credentials: true }))
app.use(express.static('public'))
app.use('api',express.static('images'))
app.use(cookieParser());
app.set("view engine","ejs");

// app.get('/test',(req,res)=>{
//     console.log(req.cookies.token)
//     res.json(req.cookies.token)
// })
// app.get('/setCookie', (req, res)=> {
//     res.cookie('sites', 'anonystick.com');
//     res.json({ok: 1})
// })
app.use('/api', routerUser)
app.use('/api', routerBook)
app.listen(process.env.PORT || 8080, () => {
    console.log('server listen on PORT 8080 ')
});
