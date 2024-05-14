module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    }, {
      tablename: 'categories',
      timestamps: false,
      underscored: true, 
    });

    Category.associate = (models) => {
      Category.belongsToMany(models.BlogPost, {
        as: 'blog_posts',
        through: 'posts_categories',
        foreignKey: 'category_id',
        otherKey: 'post_id',
      })
    }
    
  return Category;
};