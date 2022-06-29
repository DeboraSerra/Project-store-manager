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
  getAll: async () => {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id;`;
    const [sales] = await conn.execute(query);
    return sales;
  },
  findById: async (id) => {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`;
    const [sales] = await conn.execute(query, [id]);
    return sales;
  },
};

module.exports = saleModel;
