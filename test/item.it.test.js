let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
var request = require('supertest');

// Assertion type
chai.should();

chai.use(chaiHttp);

const userCredentials = {
	adminUser : {
		email: 'admin@gmail.com',
		password: '123456'
	},
	customerUser : {
		email: 'janesmith@gmail.com',
		password: '123456'
	},
};
const authenticatedUser = request.agent(server);

let itemId = null;
let token;
let item = {
	title: 'Test item',
	description: "Test description",
	unitPrice: 10.99,
	type: 'pasta'
};

describe('Should check item end points', () => {
	before(function (done) {
		authenticatedUser
			.post('/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(userCredentials.adminUser)
			.end(function (err, res) {
				if (err) throw err;
				token = res.body.token;
				done();
			});
	});

	describe('GET /items', () => {
		it('Should get all the items', (done) => {
			chai
				.request(server)
				.get('/items')
				.end((err, res) => {
					console.log("******************",res.body.data.length)
					res.should.have.status(200);
					res.body.data.should.be.a('array');
					res.body.should.be.a('object');
					res.body.data.length.should.be.eq(res.body.count);
					done();
				});
		});
		it('Should not get all the items', (done) => {
			chai
				.request(server)
				.get('/item')
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe('POST /items', () => {
		it('Should create an item', (done) => {
			chai
				.request(server)
				.post('/items')
				.set({ Authorization: `Bearer ${token}` })
				.send(item)
				.end((err, res) => {
					itemId = res.body.data._id;
					res.should.have.status(201);
					res.body.data.title.should.be.eq(item.title);
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('image');
					done();
				});
		});

		it('Should not create an item without title', (done) => {
			delete item.title;
			chai
				.request(server)
				.post('/item')
				.set({ Authorization: `Bearer ${token}` })
				.send(item)
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe('GET /item/:id', () => {
		it('Should get single item', (done) => {
			chai
				.request(server)
				.get(`/items/${itemId}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('image');
					res.body.success.should.be.eq(true);
					done();
				});
		});
		it('Should throw error when trying to get non existing item', (done) => {
			const itemId = '5d725a037b292f5f8ceff704';
			chai
				.request(server)
				.get(`/items/${itemId}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.error.should.be.eq(
						`Item not found with id of ${itemId}`
					);
					done();
				});
		});
	});

	describe('PUT /items/:id', () => {
		it('Should update an item', (done) => {
			item = {
				...item,
				type: 'pasta',
				description: 'Test Description update'
			};
			chai
				.request(server)
				.put(`/items/${itemId}`)
				.set({ Authorization: `Bearer ${token}` })
				.send(item)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.data.description.should.be.eq(item.description);
					res.body.data.type.should.be.eq(item.type);
					done();
				});
		});

		it('Should throw error if trying to update non existing item', (done) => {
			const itemId = '5d725a037b292f5f8ceff704';
			chai
				.request(server)
				.put(`/items/${itemId}`)
				.set({ Authorization: `Bearer ${token}` })
				.send(item)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.error.should.be.eq(
						`Item not found with id of ${itemId}`
					);
					done();
				});
		});
	});

	describe('DELETE /items/:id', () => {
		it('Should delete an item', (done) => {
			chai
				.request(server)
				.delete(`/items/${itemId}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.be.eq(true);
					done();
				});
		});
		it('Should throw error if trying to delete non existing item', (done) => {
			const itemId = '5d725a037b292f5f8ceff704';
			chai
				.request(server)
				.delete(`/items/${itemId}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					res.should.have.status(404);
					res.body.error.should.be.eq(
						`Item not found with id of ${itemId}`
					);
					done();
				});
		});
	});
});
