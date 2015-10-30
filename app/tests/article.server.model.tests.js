var app = require('../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

var user, article;

//Test using a describe() method, which informs the test tool this test is going to examine the Article model. 
describe('Article Model Unit Tests:', function() {  
//Inside the describe block, we began by creating new user and article objects using the beforeEach() method. 
//The beforeEach() method is used to define a block of code that runs before each test is executed.	
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

//Notice how the beforeEach() method informs the test framework that it can continue with the tests execution by calling the done() callback. 
//This will allow the database operations to be completed before actually executing the tests.
      done();
    });
  });

//a new describe block indicating that you were about to test the model save method.
  describe('Testing the save method', function() {
//The first test used the article object to save a new article.
    it('Should be able to save without problems', function() {
      article.save(function(err) {
        should.not.exist(err);
      });
    });

//The second test checked the Article model validation by assigning an invalid value to the title property. 
    it('Should not be able to save an article without a title', function() {
      article.title = '';

      article.save(function(err) {
        should.exist(err);
      });
    });
  });

//clean up the Article and User collections using the afterEach() method. 
//Like with the beforeEach() method, this code will run after each test is executed, 
//and can also be replaced with an after() method. The done() method is also used here in the same manner.
  afterEach(function(done) {
    Article.remove(function() {
      User.remove(function() {
        done();
      });
    });
  });
});