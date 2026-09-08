import { models } from '../config/db.js';

const { Order, OrderItem, Cart, CartItem, Product, User } = models;

export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          include: [Product],
        },
      ],
    });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.CartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.Product.price,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    for (const item of cart.CartItems) {
      const product = await Product.findByPk(item.productId);
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.title}`,
        });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      userId,
      totalAmount,
      address,
      paymentMethod: 'COD',
      status: 'Placed',
    });

    for (const item of orderItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order.id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};