module.exports = function(sequelize, DataTypes) {
  const Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    api_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  return Player;
};
