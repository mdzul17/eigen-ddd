const MemberRepository = require("../../../Domains/members/MemberRepository")
const BookRepository = require("../../../Domains/books/BookRepository")
const ReturnBooksUseCase = require("../ReturnBooksUseCase")

describe("ReturnBooksUseCase", () => {
    it("should orchestrating the returning book action correctly", async() => {
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

        mockBookRepository.checkBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(true))
        mockBookRepository.checkBorrowingDuration = jest.fn().mockImplementation(() => Promise.resolve([]))
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

    it("should set penalty when borrowing duration more than 7 days", async() => {
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

        mockBookRepository.checkBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(true))
        mockBookRepository.checkBorrowingDuration = jest.fn().mockImplementation(() => Promise.resolve([{duration: 8}]))
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