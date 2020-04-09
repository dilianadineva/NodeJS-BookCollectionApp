var bodyParser = require('body-parser');
var mongoose = require("mongoose")
var Book = require('../models/bookModel')

//connect to db
let connectionAddress = 'mongodb+srv://mnyaha:mnyaha@cluster0-heiuq.mongodb.net/booksCollection'
mongoose.connect(connectionAddress, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function (err, db) {
    if (err) {
        return console.dir(err);
    }
})

/* var booksSchema = new mongoose.Schema({ //variable reference to a mongodb schema
    title: String,
    author: String,
    imageUrl: String,
    desc: String
})
var Book = mongoose.model('Book', booksSchema) 
 */
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

module.exports = function (app) {

    app.get('/', function (req, res) {
        Book.find({}, function (err, data) {
            if (err) {
                console.log(err)
                exit
            }
            res.render('books', {
                books: data
            })
        })
    })

    app.get('/add_book', function (req, res) {
        Book.find({}, function (err, data) { //or Book.find({}).exec(function(err,results){blabla... })
            if (err) {
                console.log(err)
                exit
            }
            res.render('add_book', {
                books: data
            })
        })

    })

    app.post('/add_book', urlencodedParser, function (req, res) {
        //data.push(req.body)
        var newBook = new Book()
        newBook.title = req.body.title
        newBook.author = req.body.author
        newBook.imageUrl = req.body.imageUrl
        newBook.desc = req.body.desc
        newBook.isbn = req.body.isbn
        newBook.save(function (err, data) {
            if (err) {
                throw err
            } else {
                res.send(data) //or res.json(data)
            }
        })
        //res.render('books',{books:data}) */

    })

    app.get('/book/:isbn', function (req, res) {
        Book.findOne({
            isbn: req.params.isbn
        }, function (err, data) {
            if (err) throw err
            else {
                res.render('book_details', {
                    books: data
                })
            }
        })
        // res.end()
    })

    app.delete('/delete_book/:id', function (req, res) {
        Book.deleteOne({
            _id: req.params.id
        }, function (err, data) {
            if (err) {
                console.log("ERROR")
                throw err
            } else {
                res.json({})
            }

        })

        /* data = data.filter(function (books) {
            return books.item.replace(/ /g, '-') !== req.params.item
        })
        res.send(data) //or res.json(data) */
    })

    app.get('/search', (req, res) => {
        let search = req.query.keyword
        Book.find({
            title: new RegExp(search, 'i')
        }, null, function (err, docs) {
            if (err) {
                console.log("ERROR")
                throw err
            } else {
                res.render('books', {
                    books: docs
                })
            }
        })
    })

    app.get('/404', (req, res) => {
        res.status(404).end();
    })

    app.get('/download', (req, res) => {
        res.download('download.txt')
    })

}