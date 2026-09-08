import { models } from '../config/db.js';
import { Op } from 'sequelize';

const { Product } = models;

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    const where = {};
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }
    if (category) {
      where.category = category;
    }

    const products = await Product.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Product.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await Product.findByPk(id);
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};