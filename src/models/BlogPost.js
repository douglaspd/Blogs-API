module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(255),
    },
    content: {
      type: DataTypes.STRING(255),
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    published: { 
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: { 
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    }, {
      tableName: 'blog_posts',
      timestamps: false,
      underscored: true, 
    });

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      })
      BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: 'posts_categories',
        foreignKey: 'post_id',
        otherKey: 'category_id',
      })
    }

  return BlogPost;
};