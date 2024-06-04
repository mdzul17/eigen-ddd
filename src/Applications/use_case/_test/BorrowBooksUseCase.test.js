const MemberRepository = require("../../../Domains/members/MemberRepository")
const BookRepository = require("../../../Domains/books/BookRepository")
const BorrowBooksUseCase = require("../BorrowBooksUseCase")

describe("BorrowBooksUseCase", () => {
    it("should orchestrating the borrow book action correctly", async() => {
        const useCasePayload = {
            codeBook: "JK-45",
            codeMember: "M001"
        }

        const mockMemberRepository = new MemberRepository()
        const mockBookRepository =  new BookRepository()

        mockBookRepository.countBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(0))
        mockBookRepository.verifyBorrowedBooks = jest.fn().mockImplementation(() => Promise.resolve())
        mockMemberRepository.verifyPenalizedStatus = jest.fn().mockImplementation(() => Promise.resolve())

        const borrowBookUseCase = new BorrowBooksUseCase({
            memberRepository: mockMemberRepository,
            bookRepository: mockBookRepository
        })

        const borrowBook = await borrowBookUseCase.execute(...useCasePayload)

        expect(borrowBook).toStrictEqual({ codeBook: "JK-45", codeMember: "M001"})
    })
})