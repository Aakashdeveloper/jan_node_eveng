var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Rest Api',() => {
    it('Should return status as 200 for users',(done) => {
        chai.request(`http://localhost:9008`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
    it('Should return status as 404 for user',(done) => {
        chai.request(`http://localhost:9008`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
    it('Should return status as 404 for user',(done) => {
        chai.request(`http://localhost:9008`)
        .post('/addUser')
        .send({"name":"TestUser","city":"test","phone":"test","role":"test"})
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
})