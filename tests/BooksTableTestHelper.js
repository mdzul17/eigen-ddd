/* istanbul ignore file */

const pool = require("../src/Infrastructures/database/postgres/pool");

const BooksTableTestHelper = {
  async addBook({
    code = "JK-45",
    title = "Harry Potter",
    author = "J.K Rowling",
    stock = 1
  }) {
    const query = {
      text: "INSERT INTO books(code, title, author, stock) VALUES($1, $2, $3, $4)",
      values: [code, title, author, stock],
    };

    await pool.query(query);
  },

  async findBookById(code) {
    const query = {
      text: "SELECT * FROM books WHERE code = $1",
      values: [code],
    };

    const res = await pool.query(query);
    return res.rows[0]
  },

  async cleanTable() {
    return await pool.query("DELETE FROM books");
  },
};

module.exports = BooksTableTestHelper;
