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

let userId = null;
let token;
let user = {
	name: "Test",
	email: 'testuser@gmail.com',
	password: '123456'
};

describe('Should check user end points', () => {
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

	describe('GET /users', () => {
		it('Should get all the users by admin', (done) => {
			chai
				.request(server)
				.get('/users')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.data.should.be.a('array');
					res.body.should.be.a('object');
					res.body.data.length.should.be.eq(res.body.count);
					done();
				});
		});
		it('Should not get all the users', (done) => {
			chai
				.request(server)
				.get('/user')
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	describe('POST /users', () => {
		it('Should create an item', (done) => {
			chai
				.request(server)
				.post('/users')
				.set({ Authorization: `Bearer ${token}` })
				.send(user)
				.end((err, res) => {
					userId = res.body.data._id;
					res.should.have.status(201);
					res.body.data.name.should.be.eq(user.name);
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('role');
					done();
				});
		});

		it('Should not create an user without name', (done) => {
			delete user.name;
			chai
				.request(server)
				.post('/users')
				.set({ Authorization: `Bearer ${token}` })
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	describe('GET /users/:id', () => {
		it('Should get single user', (done) => {
			chai
				.request(server)
				.get(`/users/${userId}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('role');
					res.body.success.should.be.eq(true);
					done();
				});
		});
		it('Should throw error when trying to get non existing user', (done) => {
			const userId2 = '602ca11b1a73ee0c87a25877';
			chai
				.request(server)
				.get(`/users/${userId2}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					//console.log("***********", res.status)
					res.should.have.status(404);
					res.body.error.should.be.eq(
						`User not found with id of ${userId2}`
					);
					done();
				});
		});
	});

	describe('PUT /items/:id', () => {
		xit('Should update an item', (done) => {
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

		xit('Should throw error if trying to update non existing item', (done) => {
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

	describe('DELETE /users/:id', () => {
		it('Should delete an item', (done) => {
			chai
				.request(server)
				.delete(`/users/${userId}`)
				.set({ Authorization: `Bearer ${token}` })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.be.eq(true);
					done();
				});
		});
		xit('Should throw error if trying to delete non existing item', (done) => {
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
