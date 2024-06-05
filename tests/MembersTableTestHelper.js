/* istanbul ignore file */

const pool = require("../src/Infrastructures/database/postgres/pool");

const MembersTableTestHelper = {
  async addMember({
    code = "M001",
    name = "Angga",
    penalty_status = "0",
    penalty_date = "2021-08-08T07:19:09.775Z"
}) {
    const query = {
      text: "INSERT INTO members(code, name, penalty_status, penalty_date) VALUES($1, $2, $3, $4)",
      values: [code, name, penalty_status, penalty_date],
    };

    await pool.query(query);
  },

  async findMemberById(code) {
    const query = {
      text: "SELECT * FROM members WHERE code = $1",
      values: [code],
    };

    await pool.query(query);
  },

  async cleanTable() {
    return await pool.query("DELETE FROM members");
  },
};

module.exports = MembersTableTestHelper;
