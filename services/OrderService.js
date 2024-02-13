const createError = require('http-errors');
const OrderModel = require('../models/order');
const OrderItemModel = require('../models/orderItem');

module.exports = class OrderService {
    async create(data) {
        const { userId } = data;
        try {
            const Order = new OrderModel();
            const order = await Order.create({ userId, total });
            return cart;
        } catch(err) {
            throw err;
        }
    };

    async list(userId) {
        try {
            const orders = await OrderModel.findByUser(userId);
            return orders;
        } catch(err) {
            throw err;
        }
    };

    async findById(orderId) {
        try {
            const order = await OrderModel.findById(orderId);
            return order;
        } catch(err) {
            throw err;
        }
    }
}