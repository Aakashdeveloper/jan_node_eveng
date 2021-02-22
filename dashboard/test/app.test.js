var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Rest Api',() => {
    it('Should return status as 200',(done) => {
        chai.request(`http://localhost:9008`)
        .get('/health')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
})

