class BorrowBooksUseCase {

    constructor({memberRepository, bookRepository}) {
        this._memberRepository = memberRepository
        this._bookRepository = bookRepository
    }

    async execute(codeMember, payload) {
        const isBorrowed = await this._bookRepository.checkBorrowedBooksByMember(codeMember, payload)
        if(!isBorrowed) {
            throw new Error("RETURN_BOOKS_USE_CASE.NOT_BORROWED_BOOKS")
        }
        
        const duration = await this._bookRepository.checkBorrowingDuration(codeMember, payload)
        if(duration > 7) {
            await this._memberRepository.setPenaltyStatus(codeMember)
        }

        return await this._bookRepository.returnsBook(codeMember, payload)
    }
}

module.exports = BorrowBooksUseCase