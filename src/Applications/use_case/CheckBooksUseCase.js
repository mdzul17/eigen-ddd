class CheckBooksUseCase {

    constructor({bookRepository}) {
        this._bookRepository = bookRepository
    }

    async execute() {
        const totalBooks = await this._bookRepository.getCountAllBooks();
        const totalBorrowedBooks = await this._bookRepository.getCountBorrowedBooks();
        const getBooks = await this._bookRepository.getBooks();

        return {
            books: getBooks,
            quantities: totalBooks - totalBorrowedBooks
        }
    }
}

module.exports = CheckBooksUseCase