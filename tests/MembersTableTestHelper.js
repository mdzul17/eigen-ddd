/* istanbul ignore file */

const pool = require("../src/Infrastructures/database/postgres/pool");

const MembersTableTestHelper = {
  async addMembers({
    code = "M001",
    name = "Angga",
}) {
    const query = {
      text: "INSERT INTO members(code, name) VALUES($1, $2)",
      values: [code, name],
    };

    await pool.query(query);
  },

  async cleanTable() {
    return await pool.query("DELETE FROM members");
  },
};

module.exports = MembersTableTestHelper;
