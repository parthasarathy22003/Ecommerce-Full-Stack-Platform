import { models } from '../config/db.js';

const { Address } = models;

export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.json({ message: 'Address saved successfully', address });
  } catch (error) {
    res.status(500).json({ message: 'Error saving address', error: error.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error: error.message });
  }
};