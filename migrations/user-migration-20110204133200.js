module.exports = { 
    up: function(migration, DataTypes) {
		migration.dropTable('Users')
        migration.createTable('Users', {
            id:{
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            password: DataTypes.STRING,
            accessToken: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        });
    },
    down: function(migration, DataTypes) {
        migration.dropTable('Users')
    }            
}