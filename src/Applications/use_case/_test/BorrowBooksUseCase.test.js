const MemberRepository = require("../../../Domains/members/MemberRepository")
const BookRepository = require("../../../Domains/books/BookRepository")
const BorrowBooksUseCase = require("../BorrowBooksUseCase")

describe("BorrowBooksUseCase", () => {
    it("should orchestrating the borrow book action correctly", async() => {
        const bookPayload = [
            {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling"
            }
        ]
        const memberPayload = {
            code: "M001",
            name: "Angga",
        }

        const mockMemberRepository = new MemberRepository()
        const mockBookRepository =  new BookRepository()

        mockBookRepository.verifyBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve())
        mockMemberRepository.verifyPenalizedStatus = jest.fn().mockImplementation(() => Promise.resolve())
        mockBookRepository.borrowBook = jest.fn().mockImplementation(() => Promise.resolve([
            {
                code_book: "JK-45"
            }
        ]))

        const borrowBookUseCase = new BorrowBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })

        const borrowBook = await borrowBookUseCase.execute(memberPayload.code, bookPayload)

        expect(borrowBook).toStrictEqual({
            borrower: memberPayload.code,
            books: [{code_book: "JK-45"}]
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
            },
            {
                code: "SHR-1",
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle",
            },
            {
                code: "TW-11",
                title: "Twilight",
                author: "Stephenie Meyer",
            }
        ]

        const memberPayload = {
            code: "M001",
            name: "Angga",
        }

        const mockMemberRepository = new MemberRepository()
        const mockBookRepository =  new BookRepository()

        mockBookRepository.verifyBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve())
        mockMemberRepository.verifyPenalizedStatus = jest.fn().mockImplementation(() => Promise.resolve())
        mockBookRepository.borrowBook = jest.fn().mockImplementation(() => Promise.resolve([
            {
                code_book: "JK-45"
            },
            {
                code_book: "SHR-1"
            },
            {
                code_book: "TW-11"
            }
        ]))

        const borrowBookUseCase = new BorrowBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })
        expect(borrowBookUseCase.execute(memberPayload.code, bookPayload)).rejects.toThrow("BORROW_BOOKS_USE_CASE.CAN_NOT_BORROW_MORE_THAN_2")
    })
})