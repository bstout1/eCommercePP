const createError = require('http-errors');
const CartModel = require('../models/cart');
const OrderModel = require('../models/order');
const CartItemOModel = require('../models/cartItem');

module.exports = class CartService {
    async create(data) {
        const { userId } = data;

        try {
            const Cart = new CartModel();
            const cart = await Cart.create(userId);
            return cart;
        } catch(err) {
            throw err;
        }
    };

    async loadCart(userId) {
        try {
            const cart = await CartModel.findOneByUser(userId);
            const items = await CartItemOModel.find(cart.id);
            cart.items = items;
            return cart;
        } catch(err) {
            throw err;
        }
    };

    async addItem(userId, item) {
        try {
            const cart = await CartModel.findOneByUser(userId);
            const cartItem = await CartItemOModel.create({ cartId: cart.id, ...item });
            return cartItem;
        } catch(err) {
            throw err;
        }
    };

    async removeItem(cartItemId) {
        try {
            const cartItem = await CartItemOModel.delete(cartItemId);
            return cartItem;
        } catch(err) {
            throw err;
        }
    };

    async updateItem(cartItemId, data) {
        try {
            const cartItem = await CartItemOModel.update(cartItemId, data);
            return cartItem;
        } catch(err) {
            throw err;
        }
    };

    async checkout(cartId, userId, paymentInfo) {
        try {
            const stripe = require('stripe')('ssk_test_FOY6txFJqPQvJJQxJ8jpeLYQ');
            const cartItems = await CartItemOModel.find(cartId);
            const total = cartItems.reduce((total, item) => {
                return total += Number(item.price);
            }, 0);
            const Order = new OrderModel({ total, userId });
            Order.addItems(cartItems);
            await Order.create();

            const charge = await stripe.charges.create({
                amount: total,
                currency: 'usd',
                source: paymentInfo.id,
                description: 'Codecademy Charge'
            });

            const order = Order.update({ status: 'COMPLETE' });
            return order;
        } catch(err) {
            throw err;
        }
    }
}