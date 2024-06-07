const BookRepository = require("../../../Domains/books/BookRepository")
const CheckBooksUseCase = require("../CheckBooksUseCase")

describe("CheckBooksUseCase", () => {
    it("should orchestrating the check books action correctly", async() => {
        const bookPayload = [
            {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            },
            {
                code: "SHR-1",
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle",
                stock: 1
            },
            {
                code: "TW-11",
                title: "Twilight",
                author: "Stephenie Meyer",
                stock: 1
            },
            {
                code: "HOB-83",
                title: "The Hobbit, or There and Back Again",
                author: "J.R.R. Tolkien",
                stock: 1
            },
            {
                code: "NRN-7",
                title: "The Lion, the Witch and the Wardrobe",
                author: "C.S. Lewis",
                stock: 1
            },
        ]

        const mockBookRepository =  new BookRepository()
        
        mockBookRepository.getCountAllBooks = jest.fn().mockImplementation(() => Promise.resolve(5))
        mockBookRepository.getCountBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve(0))
        mockBookRepository.getBooks = jest.fn().mockImplementation(() => Promise.resolve(bookPayload))

        const checkBooksUseCase = new CheckBooksUseCase({bookRepository: mockBookRepository})

        const checkBook = await checkBooksUseCase.execute()

        expect(checkBook).toStrictEqual({
            books: [
                {
                    code: "JK-45",
                    title: "Harry Potter",
                    author: "J.K Rowling",
                    stock: 1
                },
                {
                    code: "SHR-1",
                    title: "A Study in Scarlet",
                    author: "Arthur Conan Doyle",
                    stock: 1
                },
                {
                    code: "TW-11",
                    title: "Twilight",
                    author: "Stephenie Meyer",
                    stock: 1
                },
                {
                    code: "HOB-83",
                    title: "The Hobbit, or There and Back Again",
                    author: "J.R.R. Tolkien",
                    stock: 1
                },
                {
                    code: "NRN-7",
                    title: "The Lion, the Witch and the Wardrobe",
                    author: "C.S. Lewis",
                    stock: 1
                },
            ],
            quantities: 5
        })
        expect(mockBookRepository.getCountAllBooks).toHaveBeenCalled()
        expect(mockBookRepository.getCountBorrowedBooks).toHaveBeenCalled()
        expect(mockBookRepository.getBooks).toHaveBeenCalled()
    })

    it("should not count borrowed books as returned quantities value", async() => {
        const bookPayload = [
            {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            },
            {
                code: "SHR-1",
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle",
                stock: 1
            },
            {
                code: "TW-11",
                title: "Twilight",
                author: "Stephenie Meyer",
                stock: 1
            },
            {
                code: "HOB-83",
                title: "The Hobbit, or There and Back Again",
                author: "J.R.R. Tolkien",
                stock: 1
            },
            {
                code: "NRN-7",
                title: "The Lion, the Witch and the Wardrobe",
                author: "C.S. Lewis",
                stock: 1
            },
        ]

        const mockBookRepository =  new BookRepository()
        
        mockBookRepository.getCountAllBooks = jest.fn().mockImplementation(() => Promise.resolve(5))
        mockBookRepository.getCountBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve(1))
        mockBookRepository.getBooks = jest.fn().mockImplementation(() => Promise.resolve(bookPayload))

        const checkBooksUseCase = new CheckBooksUseCase({bookRepository: mockBookRepository})

        const checkBook = await checkBooksUseCase.execute()

        expect(checkBook).toStrictEqual({
            books: [
                {
                    code: "JK-45",
                    title: "Harry Potter",
                    author: "J.K Rowling",
                    stock: 1
                },
                {
                    code: "SHR-1",
                    title: "A Study in Scarlet",
                    author: "Arthur Conan Doyle",
                    stock: 1
                },
                {
                    code: "TW-11",
                    title: "Twilight",
                    author: "Stephenie Meyer",
                    stock: 1
                },
                {
                    code: "HOB-83",
                    title: "The Hobbit, or There and Back Again",
                    author: "J.R.R. Tolkien",
                    stock: 1
                },
                {
                    code: "NRN-7",
                    title: "The Lion, the Witch and the Wardrobe",
                    author: "C.S. Lewis",
                    stock: 1
                },
            ],
            quantities: 4
        })
        expect(mockBookRepository.getCountAllBooks).toHaveBeenCalled()
        expect(mockBookRepository.getCountBorrowedBooks).toHaveBeenCalled()
        expect(mockBookRepository.getBooks).toHaveBeenCalled()
    })
})