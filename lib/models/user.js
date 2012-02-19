var bcrypt = require('bcrypt');  

module.exports = function(sequelize, DataTypes) {
    var properties = {
        id: {
            type: DataTypes.INT, 
            primarKey: true, 
            unique: true
        },        
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true
        },
        firstName: {type: DataTypes.STRING},
        lastName: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING},        
    }
    
    var instanceMethods = {
        findUserById: function (id, callback) {
            this.find({ where: { id: id } }).success(function(user) {
                if (user) {
                    callback(null,user);
                } else {
                    callback(new Error('Unable to fetch user.'), null);
                }
            })
        },
        findOrCreateFacebookUser: function (session, token, extra, metadata) {
            var promise = this.Promise();
            this.find({ where: { email: metadata.email } }).success(function(user) {
                if (user === null) {
                    var newUser = this.build({
                        email: metadata.email,
                        firstName: metadata.first_name,
                        lastName: metadata.last_name,
                        accessToken: token
                    })
                    
                    newUser.save()
                        .success(function(user) {
                            return promise.fulfill(user.values);
                        })
                        .error(function(errors){
                            return promise.fail(errors);
                        })
                } else {
                    promise.fulfill(user.values);
                }
            })
            return promise;
        },
        generatePassword: function(str) {                
            var salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(str, salt);
        },
        authenticate: function(str) {
            return bcrypt.compareSync(str, this.password);
        }
    }
    
    return sequelize.define('User', properties, {
        instanceMethods: instanceMethods
    });
}