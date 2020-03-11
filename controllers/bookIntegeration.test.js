require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js');

process.env.ENV = 'Test';

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
	it('Should allow a book to be posted and return read and _id', done => {
		const bookPost = { title: 'Test Book', author: 'Jon', genre: 'Fiction' };

		agent
			.post('/api/books')
			.send(bookPost)
			.expect(200)
			.end((err, result) => {
				// console.log(result);
				result.body.read.should.not.equal(true);
				result.body.should.have.property('_id');
				done();
			});
	});

	afterEach(done => {
		Book.deleteMany({}).exec();
		done();
	});

	after(done => {
		mongoose.connection.close();

		app.server.close(done());
	});
});
