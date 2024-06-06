/* istanbul ignore file */

const pool = require("../src/Infrastructures/database/postgres/pool");

const MembersBooksTableTestHelper = {
  async addMembersBooks({
    code_member = "M001",
    code_book = "JK-45",
    borrow_date
}) {
    const query = {
      text: "INSERT INTO books_members(code_member, code_book, borrow_date) VALUES($1, $2, $3)",
      values: [code_member, code_book, borrow_date],
    };

    await pool.query(query);
  },

  async findBorrowedBooks({
    code_member = "M001",
    code_book = "JK-45",
}) {
    const query = {
      text: "SELECT * FROM books_members WHERE code_member = $1 AND code_book = $2",
      values: [code_member, code_book],
    };

    const result = await pool.query(query);

    return result.rows
  },

  async cleanTable() {
    return await pool.query("DELETE FROM books_members");
  },
};

module.exports = MembersBooksTableTestHelper;
