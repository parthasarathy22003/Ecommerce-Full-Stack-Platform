import { DataTypes } from 'sequelize';

const defineAddress = (sequelize) => {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    addressLine: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    pincode: DataTypes.STRING,
  }, {
    timestamps: true,
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Address;
};

export default defineAddress;