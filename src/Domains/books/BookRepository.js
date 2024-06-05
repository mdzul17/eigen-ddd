class BookRepository {
    async getBooks(id) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async addBook({}) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async verifyBorrowedBooks(payload) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async borrowBook(memberid, payload){
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    
    async returnsBook(memberid, payload) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async checkBorrowedBooksByMember(memberid, payload) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async checkBorrowingDuration(memberid, payload) {
        throw new Error("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }
}

module.exports = BookRepository