var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

var user, article;

//describe() method, which informs the test tool this test is going to examine the Articles controller
describe('Articles Controller Unit Tests:', function() {
//began by creating new user and article objects using the beforeEach() method
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      article = new Article({
        title: 'Article Title',
        content: 'Article Content',
        user: user
      });

      article.save(function(err) {
        done();
      });
    });
  });

//created a new describe block indicating that you were about to test the controllers' GET methods.
  describe('Testing the GET methods', function() {
	//The first test uses the SuperTest assertion library to issue an HTTP GET request at the endpoint that returns the list of articles.
    it('Should be able to get the list of articles', function(done){
      request(app).get('/api/articles/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.Array.and.have.lengthOf(1);
          res.body[0].should.have.property('title', article.title);
          res.body[0].should.have.property('content', article.content);

          done();
        });
    });

	//second test uses the SuperTest assertion library to issue an HTTP GET request at the endpoint that returns a single article.
    it('Should be able to get the specific article', function(done) {
      request(app).get('/api/articles/' + article.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.Object.and.have.property('title', article.title);
          res.body.should.have.property('content', article.content);

          done();
        });
    });
  });

//finished your tests by cleaning up the Article and User collections using the afterEach() method.
  afterEach(function(done) {
    Article.remove().exec();
    User.remove().exec();
    done();
  });
});