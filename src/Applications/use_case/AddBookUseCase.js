class AddBookUseCase {
    constructor({bookRepository}){
        this._bookRepository = bookRepository
    }

    async execute(payload) {
        this._verifyPayload(payload)
        const addBook = await this._bookRepository.addBook(payload)

        return addBook
    }

    _verifyPayload(payload) {
        if(
            typeof payload.code != "string" ||
            typeof payload.title != "string" ||
            typeof payload.author != "string" ||
            typeof payload.stock != "number"
        ) {
            throw new Error("ADD_BOOK_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION")
        }
    }
}

module.exports = AddBookUseCase