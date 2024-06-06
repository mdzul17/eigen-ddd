const autoBind = require("auto-bind")
const BorrowBooksUseCase = require("../../../../Applications/use_case/BorrowBooksUseCase")
const ReturnBooksUseCase = require("../../../../Applications/use_case/ReturnBooksUseCase")
const CheckBooksUseCase = require("../../../../Applications/use_case/CheckBooksUseCase")

class BooksController {
    constructor(container) {
        this._container = container

        autoBind(this)
    }

    async postBorrow(req, res) {
        const { code, books } = req.body
        const borrowBooksUseCase = this._container.getInstance(BorrowBooksUseCase.name)

        const result = await borrowBooksUseCase.execute(code, books)
        return res.status(201).json({status: 'success', data: result})
    }

    async getBooks(req, res) {
        const checkBooksUseCase = this._container.getInstance(CheckBooksUseCase.name)

        const books = await checkBooksUseCase.execute()
        return res.status(200).json({status: 'success', data: books})
    }

    async delBookReturn(req, res) {
        const { code, book } = req.body
        const returnBooksUseCase = this._container.getInstance(ReturnBooksUseCase.name)

        await returnBooksUseCase.execute(code, book)

        return res.status(200).json({status: 'success'})
    }
}

module.exports = BooksController