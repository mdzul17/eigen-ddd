const AddMemberUseCase = require("../AddMemberUseCase")
const MemberRepository = require("../../../Domains/members/MemberRepository")

describe("AddMemberUseCase", () => {
    it("Should orchestrating add member use case", async() => {
        const payload = {
            name: "Angga"
        }

        const mockMemberRepository = new MemberRepository();
        mockMemberRepository.addMember = jest.fn().mockImplementation(() => Promise.resolve(payload))

        const addMemberUseCase = new AddMemberUseCase({memberRepository: mockMemberRepository})
        const addMember = await addMemberUseCase.execute(payload)

        expect(addMember).toStrictEqual({name: "Angga"})
    })
    it("Should return error when does not meet data specification", async() => {
        const payload = {
            name: 1
        }

        const mockMemberRepository = new MemberRepository();
        mockMemberRepository.addMember = jest.fn().mockImplementation(() => Promise.resolve())

        const addMemberUseCase = new AddMemberUseCase({memberRepository: mockMemberRepository})

        expect(addMemberUseCase.execute(payload)).rejects.toThrow("ADD_MEMBER_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION")
    })
})