const InvariantError = require("../../Commons/exceptions/InvariantError")
const MembersRepository = require("../../Domains/members/MemberRepository")
const format = require("pg-format")

class MembersRepositoryPostgres extends MembersRepository {
    constructor(pool, idGenerator) {
        super()
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addMember(payload) {
        const { name } = payload;
        const id = `M${this._idGenerator()}`

        const query = {
            text: "INSERT INTO members(code, name) VALUES($1, $2) RETURNING code, name",
            values: [id, name]
        }

        const result = await this._pool.query(query)

        return result.rows[0]
    }

    async verifyPenalizedStatus(payload) {
        const { code } = payload
        
        const query = {
            text: "SELECT penalty_status FROM members WHERE code = $1",
            values: [code]
        }

        const result = await this._pool.query(query)

        return result.rows[0]
    }

    async getMembers() {
        const query = {
            text: "SELECT * FROM members"
        }

        const result = await this._pool.query(query)

        return result.rows
    }

    async setPenaltyStatus(payload) {
        const code = payload.code
        const penalty_status = payload.penalty_status || "0"
        let query = ""

        if(penalty_status == "0"){
            query = {
                text: "UPDATE members SET penalty_status = 1, penalty_date = $2 WHERE code = $1 RETURNING code, penalty_status, penalty_date",
                values: [code, new Date()]
            }
        } else {
            query = {
                text: "UPDATE members SET penalty_status = 0, penalty_date = $2 WHERE code = $1 RETURNING code, penalty_status, penalty_date",
                values: [code, null]
            }
        }

        const result = await this._pool.query(query)

        return result.rows
    }
}

module.exports = MembersRepositoryPostgres