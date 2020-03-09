const express = require('express');

const bookRouter = express.Router();

const routes = Book => {
	bookRouter
		.route('/books')
		.post((req, res) => {
			const book = new Book(req.body);
			book.save();
			return res.status(201).json(book);
		})
		.get((req, res) => {
			const query = {};

			if (req.query.genre) {
				query.genre = req.query.genre;
			}

			Book.find(query, (err, books) => {
				if (err) {
					return res.send(err);
				}
				return res.send(books);
			});
		});
	bookRouter.route('/books/:bookId').get((req, res) => {
		Book.findById(req.params.bookId, (err, books) => {
			if (err) {
				return res.send(err);
			}
			return res.send(books);
		});
	});
};

module.exports = routes;
