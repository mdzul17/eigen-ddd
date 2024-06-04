const BookRepository = require("../BookRepository")

describe("BookRepository", () => {
    it("should throw an error when invoke abstract", async() => {
        const bookRepository = new BookRepository();

        await expect(bookRepository.addBook({})).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.getBooks()).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.checkBorrowedBooks("")).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.countBorrowedBooksByMember("","")).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.verifyBorrowedBooks("")).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    })
})