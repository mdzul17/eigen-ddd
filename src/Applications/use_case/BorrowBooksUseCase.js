class BorrowBooksUseCase {

    constructor({memberRepository, bookRepository}) {
        this._memberRepository = memberRepository
        this._bookRepository = bookRepository
    }

    async execute(codeMember, payload) {
        await this._verifyPayload(payload)
        await this._bookRepository.verifyBorrowedBooks(payload)
        await this._memberRepository.verifyPenalizedStatus(codeMember)
        let borrows = await this._bookRepository.borrowBook(codeMember, payload)

        return {
            borrower: codeMember,
            books: borrows
        }
    }

    async _verifyPayload(payload) {
        if(payload.length > 2) {
            throw new Error("BORROW_BOOKS_USE_CASE.CAN_NOT_BORROW_MORE_THAN_2")
        }
    }
}

module.exports = BorrowBooksUseCase