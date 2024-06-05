const BookRepository = require("../BookRepository")

describe("BookRepository", () => {
    it("should throw an error when invoke abstract", async() => {
        const bookRepository = new BookRepository();

        await expect(bookRepository.addBook({})).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.getBooks()).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.verifyBorrowedBooks({})).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.checkBorrowedBooksByMember("",{})).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.borrowBook("",{})).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.returnsBook("",{})).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.checkBorrowingDuration("",{})).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.getCountAllBooks()).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
        await expect(bookRepository.getCountBorrowedBooks()).rejects.toThrowError("BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    })
})