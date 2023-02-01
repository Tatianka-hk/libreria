const { change_password } = require( "../middleware/auth");
const User = require( '../models/usar')
const jwt = require('jsonwebtoken')
const Book = require('../models/book');
const { login_post, register_post } = require("./Auth");

exports.get_books=(req,res) => {
    try{
        // let libros = Book.find();
        console.log("BOOOKS - ", req.user.id)
        User
        .findById(req.user.id)
        .then((user)=>{
            console.log("user" - user)
            console.log("user" - user)
           
                let fav_list = user.favorite;

            
      
                console.log("si")
            
            
            let want_read_list=user.want_to_read;
            console.log(fav_list)
            console.log(want_read_list)
            Book
                .find()
                .then((books)=>{
                    let list=[];
                    
                        books.forEach(book=>{
                            let flag_fav = false;
                            
                            fav_list.forEach(fav_point=>{
                                if (fav_point.book_id == book._id){
                                    console.log("FINDED")
                                    flag_fav = true
                                }
                            })
    
        
                            
                    
                        let wtr_fav = false;
                        want_read_list.forEach(wtr_point=>{
                            if (wtr_point.book_id == book._id){
                                console.log("FINDED")
                                wtr_fav = true
                            }
                        })
                        console.log("book_id - ", book._id)
                        console.log(flag_fav)
                        let is_wanted = want_read_list.includes(book._id)
                        let point={
                            id:book._id,
                            name:book.name, 
                            author: book.author,
                            genre: book.genre,
                            short_description: book.short_description,
                            long_description: book.long_description,
                            fav:flag_fav,
                            gl:wtr_fav
                        }
                        list.push(point)
                        
                    })
                    res.send({books:list})
                })
                .catch((err)=>console.log(err))

        })
        .catch((err)=>console.log(err))

        

    } catch (err){ console.log(err)}

}

exports.add_book=(req,res) => {
    try{
        console.log( req.body.author)
        let book = new Book({name: req.body.name, 
            author: req.body.author,
            genre: req.body.genre,
            short_description: req.body.short_description,
            long_description: req.body.long_description})
        book.save();

    } catch (err){ console.log(err)}
    
}

exports.get_book=(req,res) => {
    try{
        console.log("edit_book")
        User
        .findById(req.user.id)
        .then((data)=>{
            if (data.role != "admin"){
                res.send({mes:"no"})
                console.log("no admin")
            }
            else{
                Book
                .findById(req.params.id)
                .then((book)=>{
                    console.log(book);
                        let point={
                            id:book._id,
                            name:book.name, 
                            author: book.author,
                            genre: book.genre,
                            short_description: book.short_description,
                            long_description: book.long_description
                        }
                    res.send({book:point})
                }) 
            }
        })
       

    } catch (err){ console.log(err)}

}


exports.edit_book=(req,res) => {
    try{
        
        Book
        .findByIdAndUpdate(req.params.id, {
            name:req.body.name, 
            author: req.body.author,
            genre: req.body.genre,
            short_description: req.body.short_description,
            long_description: req.body.long_description})
        .then((book)=>{
            console.log("edit");
            res.send()
        }) 

    } catch (err){ console.log(err)}

}