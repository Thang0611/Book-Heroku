const UserModel = require("../model/users")
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { use } = require("../router/users");
const saltRounds = 10;

const auth=(req,res,next)=>{
    // console.log('atu')
    try{
        console.log(req.cookies.token);
        var token=req.cookies.token;
        console.log("token: "+token)
        var key = process.env.KEY;
        var id=jwt.verify(token,key)
        console.log(id)
        UserModel.findOne({_id:id._id})
        .then(data=>{
            if (data){
                console.log(data)
                req.user=data;
                next()
            }
            else {
                res.status(400).json({
                    message:"NOT Permission",
                    success:false
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).json("token khong dung")
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json('token khong hop le')
    }
        
}
 const register = async(req, res, next) => {
    var {username,password,repassword} = req.body
    const user = new UserModel(req.body)
    // const myPlaintextPassword=password
    //create salt
    if (password!==repassword){
        return res.json({
            success: false,
            'smg':'Mật khẩu không khớp'
        })
    }
    // 
    const salt = await bcrypt.genSalt(saltRounds)
    //create hasspassword
    user.password = await bcrypt.hash(user.password, salt);
    user.repassword = await bcrypt.hash(user.repassword, salt);
    await UserModel.findOne({
        username: username,
    })
    .then(async (data) => {
            if (data) {
                console.log(user)
                return res.status(200).json({
                    isExist: true,
                    'smg':'Username đã tồn tại'
                })
            }
            
            else {
                 user.save((err, doc) => {
                    if (err) return res.status(400).json({ 
                        success: false, 
                        'msg':'Đăng kí thất bại' 
                    });
                    else {
                        console.log("Đăng nhập thành công")
                        return res.status(200).json({
                            success: true,
                            'smg':'Đăng nhập thành công'
                        });
                    }
                    
                });
                
            }
        })

        .catch(err => {
            console.log(err)
            return res.status(500).json({
                success:false,
                'msg':'Đăng kí thất bại'
            })
        })
}

const login = async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    
    await UserModel.findOne({
        username: username,
    })
    .then(async data=>{
        if(data){
            console.log(data)
            const passLogin = await bcrypt.compare(req.body.password, data.password); 
            console.log(passLogin)
            if(passLogin) return data
        }
    })
        .then((data) => {
            if (data) {
                console.log('a'+data)
                var key = process.env.KEY;
                const token = jwt.sign({
                    _id: data._id,
                },
                    key, { expiresIn: "1h" }
                )
                
                // res.clearCookie('token');
                res.cookie("token", token, { expires: new Date(Date.now() + 3600*1000) ,httpOnly: false, secure: false},)

                    res.status(200).json({
                        access: true,
                        token: token
                    })
                }
            else {
                console.log('no data')
                res.json({
                    access: false
                })
            }
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json('loi server');
        })
}

const logout = async(req, res, next) => {
    try{
        console.log(req.cookies.token)
    console.log('logout')
    res.clearCookie("token",{httpOnly: false, secure: false}),
    console.log(req.cookies.token)
    return res.json({
        access:true,
        msg:'logout done'
    })
    }
    catch{
        res.json('err logout')
    }
    
    // res.redirect(path.join(__dirname,'../public/login.html'))
}

module.exports = { register, login, logout, auth }