const createError = require('http-errors');
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
    async list(options) {
        try {
            const products = await ProductModelInstance.find(options);
            return products;
        } catch(err) {
            throw err;
        }
    };

    async get(id) {
        try {
            const product = await ProductModelInstance.findOne(id);
            if (!product) {
                throw createError(404, 'Product not found');
            }
            return product;
        } catch(err) {
            throw err;
        }
    };
}