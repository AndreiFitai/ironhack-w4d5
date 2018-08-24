const express = require('express')
const router = express.Router()
const Book = require('../models/Book')

/* GET home page */
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/book-list', (req, res) => {
    Book.find({})
        .then(books => {
            res.render('book-list', { books })
        })
        .catch(console.error)
})

router.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            res.render('book-details', { book })
        })
        .catch(console.error)
})

router.get('/create-book', (req, res) => {
    res.render('create-book')
})

router.post('/create-book', (req, res) => {
    const {
        title, author, rating, description,
    } = req.body

    new Book({
        title,
        author,
        rating,
        description,
    })
        .save()
        .then(book => {
            res.render('book-details', { book, new: true })
        })
})

module.exports = router
