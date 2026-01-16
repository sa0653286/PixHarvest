const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { products, customerDetails, paymentMethod, deliveryType } = req.body;

    // Validate stock availability
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product?.name || 'product'}` });
      }
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderProducts.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price
      });

      // Deduct stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Determine if courier safe required
    const courierSafeRequired = deliveryType === 'national';

    const order = new Order({
      products: orderProducts,
      totalAmount,
      customerDetails,
      paymentMethod,
      deliveryType,
      courierSafeRequired
    });

    const savedOrder = await order.save();
    res.status(201).json({
      message: 'Order created successfully',
      orderId: savedOrder.orderId,
      order: savedOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (admin only)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingDetails, adminNotes } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus,
        paymentStatus,
        trackingDetails,
        adminNotes
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
