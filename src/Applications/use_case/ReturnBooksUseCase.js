class ReturnBooksUseCase {

    constructor({memberRepository, bookRepository}) {
        this._memberRepository = memberRepository
        this._bookRepository = bookRepository
    }

    async execute(codeMember, payload) {
        await this._bookRepository.checkBorrowedBooksByMember(codeMember, payload)
        
        const duration = await this._bookRepository.checkBorrowingDuration(codeMember, payload)
        if(duration > 7) {
            await this._memberRepository.setPenaltyStatus(codeMember)
        }

        return await this._bookRepository.returnsBook(codeMember, payload)
    }
}

module.exports = ReturnBooksUseCase