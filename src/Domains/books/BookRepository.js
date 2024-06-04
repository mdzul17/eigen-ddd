class BookRepository {
    async getBooks(id) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async addBook() {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async checkBorrowedBooks() {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }
}

module.exports = BookRepository