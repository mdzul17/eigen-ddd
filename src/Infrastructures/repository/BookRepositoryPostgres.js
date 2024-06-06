const BooksRepository = require("../../Domains/books/BookRepository")
const NotFoundError = require("../../Commons/exceptions/NotFoundError")
const InvariantError = require("../../Commons/exceptions/InvariantError")

class BookRepositoryPostgres extends BooksRepository{

    constructor(pool) {
        super()
        this._pool = pool
    }

    async addBook(payload) {
        const {code, title, author, stock} = payload
        const query = {
            text: "INSERT INTO books(code, title, author, stock) VALUES($1, $2, $3, $4) RETURNING *",
            values: [code, title, author, stock]
        }

        const result = await this._pool.query(query)

        return result.rows[0]
    }

    async getBooks() {
        const query = {
            text: "SELECT * FROM books",
        }

        const result = await this._pool.query(query)

        return result.rows
    }

    async verifyBorrowedBooks(payload) {
        const verif = await Promise.all(payload.map(async (element) => {
            const query = {
                text: "SELECT code_book FROM books_members WHERE code_book = $1",
                values: [element.code]
            }
            
            const result = await this._pool.query(query)

            return result.rowCount
        }));

        const check = verif.find((v) => v > 0)
        
        if(check) {
            throw new InvariantError("Books being borrowed by others!")
        }
    }

    async checkBorrowedBooksByMember(memberCode, payload) {
        const verif = await Promise.all(payload.map(async (element) => {
            const query = {
                text: "SELECT code_book FROM books_members WHERE code_book = $1 and code_member = $2",
                values: [element.code, memberCode]
            }
            
            const result = await this._pool.query(query)

            return result.rowCount
        }));

        const check = verif.find((v) => v > 0)
        if(!check) {
            throw new InvariantError("Books is not the same with the borrowed one!")
        }
    }

    async borrowBook(memberCode, payload) {
        const insert = await Promise.all(payload.map(async (element) => {
            const query = {
                text: "INSERT INTO books_members(code_member, code_book) VALUES ($1, $2) RETURNING code_book",
                values: [memberCode, element.code]
            }
            
            const result = await this._pool.query(query)

            return result.rows[0]
        }));

        return {
            code_member: memberCode,
            books: insert
        }
    }

    async returnsBook(memberCode, payload) {
        const deleteBorrowed = await Promise.all(payload.map(async (element) => {
            const query = {
                text: "DELETE FROM books_members WHERE code_member = $1 AND code_book = $2 RETURNING *",
                values: [memberCode, element.code]
            }
            
            const result = await this._pool.query(query)

            return [result.rows, result.rows.length]
        }));

        deleteBorrowed.forEach(data => {
            if(!data[1]) {
                throw new NotFoundError("Failed to delete the data")
            }
        })
    }

    async checkBorrowingDuration(memberCode, payload) {
        const borrowedDuration = await Promise.all(payload.map(async (element) => {
            const query = {
                text: "SELECT (NOW()::date - bm.borrow_date::date) as duration FROM members m INNER JOIN books_members bm ON bm.code_member = m.code WHERE m.code = $1 AND bm.code_book = $2",
                values: [memberCode, element.code]
            }
            
            const result = await this._pool.query(query)

            return result.rows[0]
        }));

        return borrowedDuration
    }

    async getCountAllBooks() {
        const query = {
            text: "SELECT SUM(stock) as quantities FROM books"
        }

        const result = await this._pool.query(query)

        return result.rows
    }

    async getCountBorrowedBooks() {
        const query = {
            text: "SELECT count(*) as quantities FROM books_members"
        }

        const result = await this._pool.query(query)

        return result.rows
    }

    async getCountBorrowedBooksByMember() {
        const query = {
            text: "SELECT code_member, count(*) as quantities FROM books_members GROUP BY code_member"
        }

        const result = await this._pool.query(query)

        return result.rows
    }
}

module.exports = BookRepositoryPostgres
