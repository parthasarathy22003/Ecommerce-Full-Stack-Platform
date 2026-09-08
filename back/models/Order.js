import { DataTypes } from 'sequelize';

const defineOrder = (sequelize) => {
  const Order = sequelize.define('Order', {
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
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: 'COD',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Placed',
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  };

  return Order;
};

export default defineOrder;