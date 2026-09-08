import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Import definition functions
import defineUser from '../models/User.js';
import defineProduct from '../models/Product.js';
import defineOrder from '../models/Order.js';
import defineOrderItem from '../models/OrderItem.js';
import defineAddress from '../models/Address.js';
import defineCart from '../models/Cart.js';
import defineCartItem from '../models/CartItem.js';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

// Initialize models
const models = {
  User: defineUser(sequelize),
  Product: defineProduct(sequelize),
  Order: defineOrder(sequelize),
  OrderItem: defineOrderItem(sequelize),
  Address: defineAddress(sequelize),
  Cart: defineCart(sequelize),
  CartItem: defineCartItem(sequelize),
};

// Set up associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Connect and sync – wrapped in an async function
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync tables (alter: true for development – use with caution)
    await sequelize.sync({ alter: true });
    console.log('✅ All tables synced successfully.');
  } catch (error) {
    console.error('❌ Database error:', error);
  }
};

// Call the function
connectDB();

// Export both sequelize and models
export { sequelize, models };
export default sequelize;