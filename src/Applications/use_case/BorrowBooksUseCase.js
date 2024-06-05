class BorrowBooksUseCase {

    constructor({memberRepository, bookRepository}) {
        this._memberRepository = memberRepository
        this._bookRepository = bookRepository
    }

    async execute(codeMember, payload) {
        await this._verifyPayload(payload)
        const isBorrowed = await this._bookRepository.verifyBorrowedBooks(payload)
        if(isBorrowed) {
            throw new Error("BORROW_BOOKS_USE_CASE.BOOK_BEING_BORROWED_BY_OTHERS")
        }
        const isPenalized = await this._memberRepository.verifyPenalizedStatus(codeMember)
        if(isPenalized) {
            throw new Error("BORROW_BOOKS_USE_CASE.MEMBER_BEING_PENALIZED")
        }
        let borrows = await this._bookRepository.borrowBook(codeMember, payload)

        borrows = borrows.forEach(element => {
            delete element.quantity
            delete element.code
        });

        return {
            borrower: codeMember,
            books: payload
        }
    }

    async _verifyPayload(payload) {
        if(payload.length > 2) {
            throw new Error("BORROW_BOOKS_USE_CASE.CAN_NOT_BORROW_MORE_THAN_2")
        }
    }
}

module.exports = BorrowBooksUseCase