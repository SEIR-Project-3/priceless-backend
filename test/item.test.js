const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:7000');

// Test Item should be deleted

describe('GET, /items', () => {
	it('should return a 200 response', (done) => {
		api.get('/api/items').set('Accept', 'application/json').expect(200, done);
	});
});

describe('DELETE, /items/:id', () => {
	let prevLength;
	let idToDelete;
	let deletedItem;

	before((done) => {
		api
			.get('/items')
			.set('Accept', 'application/json')
			.end((err, res) => {
				prevLength = res.body.length;
				console.log(res.body);
				idToDelete = res.body[0]._id;
				done();
			});
	});

	it('should return the deleted item', (done) => {
		api
			.delete(`/items/${idToDelete}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				deletedItem = res.body;
				expect(deletedItem).to.be.an('object');
				done();
			});
	});

	it('should remove the deleted item from the list of items', (done) => {
		api
			.get('/items')
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(res.body.length).to.equal.apply(prevLength - 1);
				expect(res.body.find((item) => item._id === idToDelete)).to.equal(
					undefined
				);
			});
	});
});
