const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSWL: true });

module.exports = class CartModel {
    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.modified = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
    }

    async create(userId) {
        try {
            const data = { usedId, ...this}

            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async findOneByUser(userId) {
        try {
            const statement = `SELECT *
                                FROM carts
                                WHERE "userId" = $1`;
            const values = [userId];
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async findOneById(id) {
        try {
            const statement = `SELECT *
                                FROM carts 
                                WHERE "id" = $1`;
            const values = [id];
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }
}