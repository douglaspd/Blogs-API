module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id',
      references: {
        model: 'blog_posts',
        key: 'id'
      },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id'
      },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true
    }},
   {
      tableName: 'posts_categories',
      timestamps: false,
      underscored: true, 
    });

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'categoryPosts',
        through: PostCategory,
        foreignKey: 'category_id',
        otherKey: 'post_id',
      })
      models.BlogPost.belongsToMany(models.Category, {
        as: 'postsCategories',
        through: PostCategory,
        foreignKey: 'post_id',
        otherKey: 'category_id'
      })
    }

  return PostCategory;
};