const MemberRepository = require("../../../Domains/members/MemberRepository")
const BookRepository = require("../../../Domains/books/BookRepository")
const BorrowBooksUseCase = require("../BorrowBooksUseCase")

describe("BorrowBooksUseCase", () => {
    it("should orchestrating the borrow book action correctly", async() => {
        const bookPayload = [
            {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            }
        ]
        const memberPayload = {
            code: "M001",
            name: "Angga",
        }

        const mockMemberRepository = new MemberRepository()
        const mockBookRepository =  new BookRepository()

        mockBookRepository.verifyBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve(false))
        mockMemberRepository.verifyPenalizedStatus = jest.fn().mockImplementation(() => Promise.resolve(false))
        mockBookRepository.borrowBook = jest.fn().mockImplementation(() => Promise.resolve([
            {
                title: "Harry Potter",
                author: "J.K Rowling"
            }
        ]))

        const borrowBookUseCase = new BorrowBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })

        const borrowBook = await borrowBookUseCase.execute(memberPayload.code, bookPayload)

        expect(borrowBook).toStrictEqual({
            borrower: memberPayload.code,
            books: bookPayload
        })

        expect(mockBookRepository.verifyBorrowedBooks).toHaveBeenCalledWith(bookPayload)

        expect(mockMemberRepository.verifyPenalizedStatus).toHaveBeenCalledWith("M001")

        expect(mockBookRepository.borrowBook).toHaveBeenCalledWith("M001", bookPayload)
    })

    it('should return error if borrow more than 2 books', async() => {
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
            }
        ]

        const memberPayload = {
            code: "M001",
            name: "Angga",
        }

        const mockMemberRepository = new MemberRepository()
        const mockBookRepository =  new BookRepository()

        mockBookRepository.verifyBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve(false))
        mockMemberRepository.verifyPenalizedStatus = jest.fn().mockImplementation(() => Promise.resolve(false))
        mockBookRepository.borrowBook = jest.fn().mockImplementation(() => Promise.resolve([
            {
                title: "Harry Potter",
                author: "J.K Rowling"
            },
            {
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle"
            },
            {
                title: "Twilight",
                author: "Stephenie Meyer"
            }
        ]))

        const borrowBookUseCase = new BorrowBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })
        expect(borrowBookUseCase.execute(memberPayload.code, bookPayload)).rejects.toThrow("BORROW_BOOKS_USE_CASE.CAN_NOT_BORROW_MORE_THAN_2")
    })

    it('should return error when the book is borrowed by other members', async () => {
        const bookPayload = [
            {
                title: "Harry Potter",
                author: "J.K Rowling"
            },
            {
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle"
            }
        ]

        const memberPayload = {
            code: "M001",
            name: "Angga",
        }

        const mockMemberRepository = new MemberRepository()
        const mockBookRepository =  new BookRepository()

        mockBookRepository.verifyBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve(true))
        mockMemberRepository.verifyPenalizedStatus = jest.fn().mockImplementation(() => Promise.resolve(false))
        mockBookRepository.borrowBook = jest.fn().mockImplementation(() => Promise.resolve([
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
            }
        ]))

        const borrowBookUseCase = new BorrowBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })
        expect(borrowBookUseCase.execute(memberPayload.code, bookPayload)).rejects.toThrow("BORROW_BOOKS_USE_CASE.BOOK_BEING_BORROWED_BY_OTHERS")
    })
    it('should return error when member is penalized', async () => {
        const bookPayload = [
            {
                title: "Harry Potter",
                author: "J.K Rowling"
            },
            {
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle"
            }
        ]

        const memberPayload = {
            code: "M001",
            name: "Angga",
        }

        const mockMemberRepository = new MemberRepository()
        const mockBookRepository =  new BookRepository()

        mockBookRepository.verifyBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve(false))
        mockMemberRepository.verifyPenalizedStatus = jest.fn().mockImplementation(() => Promise.resolve(true))
        mockBookRepository.borrowBook = jest.fn().mockImplementation(() => Promise.resolve([
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
            }
        ]))

        const borrowBookUseCase = new BorrowBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })
        expect(borrowBookUseCase.execute(memberPayload.code, bookPayload)).rejects.toThrow("BORROW_BOOKS_USE_CASE.MEMBER_BEING_PENALIZED")
    })
})