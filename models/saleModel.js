const conn = require('./connection');

const saleModel = {
  addSale: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId }] = await conn.execute(query);
    return insertId;
  },
  soldProds: async ({ saleId, productId, quantity }) => {
    const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?);`;
    await conn.execute(query, [saleId, productId, quantity]);
    return { productId, quantity };
  },
};

module.exports = saleModel;
