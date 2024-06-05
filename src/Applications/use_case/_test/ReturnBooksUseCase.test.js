const MemberRepository = require("../../../Domains/members/MemberRepository")
const BookRepository = require("../../../Domains/books/BookRepository")
const ReturnBooksUseCase = require("../ReturnBooksUseCase")

describe("ReturnBooksUseCase", () => {
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

        mockBookRepository.checkBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(true))
        mockBookRepository.checkBorrowingDuration = jest.fn().mockImplementation(() => Promise.resolve())
        mockBookRepository.returnsBook = jest.fn().mockImplementation(() => Promise.resolve())

        const returnBookUseCase = new ReturnBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })

        await returnBookUseCase.execute(memberPayload.code, bookPayload)

        expect(mockBookRepository.checkBorrowedBooksByMember).toHaveBeenCalledWith(memberPayload.code, bookPayload)

        expect(mockBookRepository.checkBorrowingDuration).toHaveBeenCalledWith(memberPayload.code, bookPayload)

        expect(mockBookRepository.returnsBook).toHaveBeenCalledWith(memberPayload.code, bookPayload)
    })

    it("should return error when returned book is not the same with borrowed one", async() => {
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

        mockBookRepository.checkBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(false))
        mockBookRepository.checkBorrowingDuration = jest.fn().mockImplementation(() => Promise.resolve())
        mockBookRepository.returnsBook = jest.fn().mockImplementation(() => Promise.resolve())

        const returnBookUseCase = new ReturnBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })

        expect(returnBookUseCase.execute(memberPayload.code, bookPayload)).rejects.toThrow("RETURN_BOOKS_USE_CASE.NOT_BORROWED_BOOKS")

    })
    it("should return error when returned book is not the same with borrowed one", async() => {
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

        mockBookRepository.checkBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(true))
        mockBookRepository.checkBorrowingDuration = jest.fn().mockImplementation(() => Promise.resolve(8))
        mockBookRepository.returnsBook = jest.fn().mockImplementation(() => Promise.resolve())
        mockMemberRepository.setPenaltyStatus = jest.fn().mockImplementation(() => Promise.resolve())

        const returnBookUseCase = new ReturnBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })

        await returnBookUseCase.execute(memberPayload.code, bookPayload)

        expect(mockBookRepository.checkBorrowedBooksByMember).toHaveBeenCalledWith(memberPayload.code, bookPayload)
        expect(mockBookRepository.checkBorrowingDuration).toHaveBeenCalledWith(memberPayload.code, bookPayload)
        expect(mockBookRepository.returnsBook).toHaveBeenCalledWith(memberPayload.code, bookPayload)
        expect(mockMemberRepository.setPenaltyStatus).toHaveBeenCalled()
        expect(mockMemberRepository.setPenaltyStatus).toHaveBeenCalledWith(memberPayload.code)
    })
})