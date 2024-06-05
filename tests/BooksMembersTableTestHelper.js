/* istanbul ignore file */

const pool = require("../src/Infrastructures/database/postgres/pool");

const MembersBooksTableTestHelper = {
  async addMembersBooks({
    code_member = "M001",
    code_book = "HOB-83",
}) {
    const query = {
      text: "INSERT INTO books_members(code_member, code_book) VALUES($1, $2)",
      values: [code_member, code_book],
    };

    await pool.query(query);
  },

  async cleanTable() {
    return await pool.query("DELETE FROM books_members");
  },
};

module.exports = MembersBooksTableTestHelper;
