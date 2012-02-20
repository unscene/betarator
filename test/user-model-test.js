var vows = require('vows'),
    assert = require('assert'),
    flatiron = require('flatiron'),
    app = flatiron.app,
	betarator = require('../lib/')(app);

vows.describe('User model tests').addBatch({
    'When using the database plugin' : {
        topic: function() {
			debugger;
            app.use(betarator.plugins.db);
            app.init(this.callback);
        },
        "and creating a user": {
            topic: function(){
               return app.db.user.build({
                   email: 'email@example.com',    
                   firstName: 'test',
                   lastName: 'test'                   
               });
            },
            "should fill in its properties": function (user) {
               assert.equal(user.firstName, 'test');
               assert.equal(user.lastName, 'test');
               assert.equal(user.email, 'email@example.com');
            },
            "and generating a password": {
                topic: function(user) {
                    user.generatePassword('test')
                    return user;
                },
                'should allow the user to authenticate': function(user) {
                    assert.ok(user.authenticate('test'));
                }
            },
            "it should save":  {
                topic: function(user) {
                    user.email = "email@2.com";
                    debugger;
                    if (!user.validate()){
                        user.save().success(this.callback);
                    }
                },
                "if email does validate": function(user, result) {                
                    assert.ok(user);
                }
            },
            "it should not save":  {
                topic: function(user) {
                    user.email = "bad email";
                    return this.validate();
                },
                "if email does not validate": function(errors) {
                    assert.ok(errors);
                }
            }
        }
    }
}).export(module);