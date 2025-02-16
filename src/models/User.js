module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      field: 'display_name',
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    image:{ 
      type: DataTypes.STRING(255)
    },
    }, {
      tableName: 'users',
      timestamps: false,
      underscored: true, 
    });

    User.associate = (models) => {
      User.hasMany(models.BlogPost, {
        foreignKey: 'user_id',
        as: 'blogPosts',
      })
    }
    
  return User;
};