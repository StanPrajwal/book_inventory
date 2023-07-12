const Books = require("../modal/Book")
const routes = require("express").Router()
const jwt = require("jsonwebtoken")

routes.get("/fetch/:id", async(req, res) => {
    try {
        const books = await Books.findById({ _id: req.params.id })
        console.log(books)
        res.json({
            books: books.books
        })
    } catch (error) {
        throw Error(error.message)
    }

})
routes.post("/addbook/:id", async(req, res) => {
    try {
        console.log(req.body)
        let books = await Books.findById({ _id: req.params.id })
        console.log(books)
        books.books = [...books.books,req.body.values]
        await books.save()
        console.log(books)
        res.json({
            success:"Book added to inventory"
        })
    } catch (error) {
        console.log(error.message)
    }
})
routes.post("/remove/:id", async(req, res) => {
    try {
        console.log(req.body)
        const {book} = req.body
        let books = await Books.findById({ _id: req.params.id })
        console.log(books)
        books.books = books.books.filter((books)=>book.book_title !== books.book_title)
        await books.save()
        console.log(books)
        res.json({
            success:"Book removed from inventory",
            books: books.books
        })
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = routes