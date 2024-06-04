class BookRepository {
    async getBooks(id) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async addBook({}) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async checkBorrowedBooks(bookid) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async countBorrowedBooksByMember(memberid, bookid) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async verifyBorrowedBooks(bookid) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }
}

module.exports = BookRepository