const BookModel = require("../model/books")

const getBooks = async (req, res, next) => {
    await BookModel.find().select("-urlImage")
        .then((data) => {
            if (data) {
                console.log(data)
                return res.status(200).json(data)
            }
            else {
                return res.status(200).json('No post yet')
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json('No data');
        })
}
//

const detailBook=async (req,res,next)=>{

    // var id=req.body._id
    // var id=req.params._id
    console.log(req.params)
    await BookModel.findById(req.params._id)
    .then((data)=>{ 
        if (data){
            return res.status(200).json(data)
        }
        else {
            return res.status(400).json('NOT FOUND')
        }
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json('NOT FOUND ID');
    })
}

const deleteBook= (req,res,next)=>{
    var id=req.params._id
    BookModel.findById(id)
    .then(data=>{
        if(data){
            console.log(data)
            BookModel.deleteOne({_id:id},(err)=>{
                if (err){
                    return res.status(400).json({
                        success:false,
                        message:'delete failse'
                    })
                }
                else {
                    return res.status(200).json(
                        {
                            success:true,
                            message:"delete success"
                        }
                    )
                }
            })
        }
        else {
            return res.status(400).json({
                success:false
            })
        }
    })

    .catch(err=>{
        console.log('delete err:'+err)
        return res.status(500).json("NOT FOUND ID")
    })
}

const updateBook=(req,res,next)=>{
    var id=req.params._id;
    console.log(req.params)
    // const book_update=new BookModel(req.body)
    const book_update={
            title:req.body.title,
            author:req.body.author,
            type:req.body.type,
            date:req.body.date,
            numOfPage:req.body.numOfPage,
            detail:req.body.detail,
            urlImage:req.body.urlImage

    }
    BookModel.findOne({_id:id})
    .then(data=>{
        console.log(data)
        if(data){
            BookModel.updateOne({_id:data._id},book_update,(err,data)=>{
                if (err){
                    console.log(err);
                    return res.json(
                        {
                            success:false,
                            'smg':'Update sách thành công'
                        }
                    )
                }
                else {
                    // console.log(data)
                    return res.json({success:true})
                }
            })
        }
        else {
            return res.status(400).json({
                success:false,
                message:"sách được chọn không tồn tại"
            })
        }
    }
    )
    .catch(err=>{
        return res.status(500).json({
            success:false,
            message:"sách được chọn không tồn tại"
        })
    })
}

const addBook=async (req,res,next)=>{
    console.log(req.body)
    var book=new BookModel(req.body)
    await book.save((err,data)=>{
        if(err){
            return res.status(400).json({
                success:false,
                'smg':'Thêm sách thất bại'
            })
        }
        else {
            console.log(data);
            return res.json({
                success:true,
                'smg':'Thêm sách thành công'
            })
        }
    })
}

module.exports = {getBooks,detailBook,deleteBook,updateBook,addBook}
