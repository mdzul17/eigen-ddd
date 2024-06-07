const AddBookUseCase = require("../AddBookUseCase")
const BookRepository = require("../../../Domains/books/BookRepository")

describe("AddBookUseCase", () => {
    it("Should orchestrating add book use case", async() => {
        const payload = {
            code: "JK-45",
            title: "Harry Potter",
            author: "J.K Rowling",
            stock: 1
        }

        const mockBookRepository = new BookRepository();

        mockBookRepository.addBook = jest.fn().mockImplementation(() => Promise.resolve(payload))

        const addBookUseCase = new AddBookUseCase({bookRepository: mockBookRepository})
        const addedBook = await addBookUseCase.execute(payload)

        expect(addedBook).toStrictEqual({
            code: "JK-45",
            title: "Harry Potter",
            author: "J.K Rowling",
            stock: 1
        })
    })

    it("Should return error when payload does not meet data specification", async() => {
        const payload = {
            code: "JK-45",
            title: "Harry Potter",
            author: "J.K Rowling",
            stock: "1"
        }

        const mockBookRepository = new BookRepository();

        mockBookRepository.addBook = jest.fn().mockImplementation(() => Promise.resolve())

        const addBookUseCase = new AddBookUseCase({bookRepository: mockBookRepository})
        
        expect(addBookUseCase.execute(payload)).rejects.toThrow("ADD_BOOK_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION")
    })
})