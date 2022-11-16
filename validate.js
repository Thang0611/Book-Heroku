const {check, validationResult } = require('express-validator');

//validate register
let validateRegisterRules = () => {
    return [ 

      check('username', 'username không được để trống').notEmpty(),
      check('password', 'password không được để trống').notEmpty(),
      check('name', 'Name không được để trống').notEmpty(),
      check('email', 'Email không được để trống').notEmpty(),
      check('repassword', 'Nhập lại mật khẩu không được để trống').notEmpty(),
      check('username', 'username ít nhất 6 kí tự').isLength({ min: 6 }),
      check('email', 'Email không đúng định dạng').isEmail(),
      check('password', 'password ít nhất 6 kí tự').isLength({ min: 6 }),
    ];
  }

  

  const validateRegister = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ 'msg': err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
      success:false
    })
  }

// validate login
  let validateLoginRules = () => {
      return [ 
  
        check('username', 'username không được để trống').notEmpty(),
        check('password', 'password không được để trống').notEmpty(),
        check('username', 'username ít nhất 6 kí tự').isLength({ min: 6 }),
        check('password', 'password ít nhất 6 kí tự').isLength({ min: 6 }),

      ];
    }  


  const validateLogin = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ 'msg': err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
      success:false
    })
  }

// Validate addbook
  const validateAddbookRules=()=>{
    return [
      check('title','Tiêu đề không được để trống').notEmpty(),
      check('author','Tác giả không được để trống').notEmpty(),
      check('type','Thể loại không được để trống').notEmpty(),
      check('date','Năm xuất bản không được để trống').notEmpty(),
      check('numOfPage','Số trang không được để trống').notEmpty(),
      check('detail','Mô tả chi tiết không được để trống').notEmpty(),
      check('numOfPage','Số trang phải là một số').isNumeric(),
    ]
  }
  const validateAddbook=(req,res,next)=>{
    const errors=validationResult(req);
    console.log(errors.isEmpty())
    if (errors.isEmpty()){
      return next()
    }
    const listErrors=[]
    errors.array().map(err=>{
      listErrors.push({'msg':err.msg})
    })
    return res.json({
        listErrors,
        success:false
      }
    ) 
  }
  module.exports = {
    validateRegisterRules,
    validateRegister,
    validateLogin,
    validateLoginRules,
    validateAddbook,
    validateAddbookRules
  }