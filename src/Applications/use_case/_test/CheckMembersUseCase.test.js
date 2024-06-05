const MemberRepository = require("../../../Domains/members/MemberRepository")
const BookRepository = require("../../../Domains/books/BookRepository")
const CheckMembersUseCase = require("../CheckMembersUseCase")

describe("CheckMembersUseCase", () => {
    it("should orchestrating the check members action correctly", async() => {
        const memberPayload = [
            {
                code: "M001",
                name: "Angga",
            },
            {
                code: "M002",
                name: "Ferry",
            },
            {
                code: "M003",
                name: "Putri",
            },
        ]

        const mockMemberRepository =  new MemberRepository()
        const mockBookRepository =  new BookRepository()
        
        mockBookRepository.getCountBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(
            [
                {
                    memberCode: "M001",
                    quantities: 1,
                },
                {
                    memberCode: "M002",
                    quantities: 1,
                },
                {
                    memberCode: "M003",
                    quantities: 1,
                },
            ]
        ))
        mockMemberRepository.getMembers = jest.fn().mockImplementation(() => Promise.resolve(memberPayload))

        const checkMembersUseCase = new CheckMembersUseCase({memberRepository: mockMemberRepository, bookRepository: mockBookRepository})

        const checkMembers = await checkMembersUseCase.execute()

        expect(checkMembers).toStrictEqual({
            members: [
                {
                    code: "M001",
                    name: "Angga",
                    quantities: 1
                },
                {
                    code: "M002",
                    name: "Ferry",
                    quantities: 1
                },
                {
                    code: "M003",
                    name: "Putri",
                    quantities: 1
                },
            ]
        })
        expect(mockBookRepository.getCountBorrowedBooksByMember).toHaveBeenCalled()
        expect(mockMemberRepository.getMembers).toHaveBeenCalled()
    })

    it("should return 0 quantities when there are no books borrowed", async() => {
        const memberPayload = [
            {
                code: "M001",
                name: "Angga",
            },
            {
                code: "M002",
                name: "Ferry",
            },
            {
                code: "M003",
                name: "Putri",
            },
        ]

        const mockMemberRepository =  new MemberRepository()
        const mockBookRepository =  new BookRepository()
        
        mockBookRepository.getCountBorrowedBooksByMember = jest.fn().mockImplementation(() => Promise.resolve(
            [
                {
                    memberCode: "M001",
                    quantities: 1,
                },
                {
                    memberCode: "M002",
                    quantities: 1,
                }
            ]
        ))
        mockMemberRepository.getMembers = jest.fn().mockImplementation(() => Promise.resolve(memberPayload))

        const checkMembersUseCase = new CheckMembersUseCase({memberRepository: mockMemberRepository, bookRepository: mockBookRepository})

        const checkMembers = await checkMembersUseCase.execute()

        expect(checkMembers).toStrictEqual({
            members: [
                {
                    code: "M001",
                    name: "Angga",
                    quantities: 1
                },
                {
                    code: "M002",
                    name: "Ferry",
                    quantities: 1
                },
                {
                    code: "M003",
                    name: "Putri",
                    quantities: 0
                },
            ]
        })
        expect(mockBookRepository.getCountBorrowedBooksByMember).toHaveBeenCalled()
        expect(mockMemberRepository.getMembers).toHaveBeenCalled()
    })
})