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
    
  return Category;
};