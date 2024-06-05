const MemberRepository = require("../MemberRepository")

describe("MemberRepository", () => {    
    it("Should throw an error when invoke abstract behavior", async() => {
        const memberRepository = new MemberRepository();

        await expect(memberRepository.addMember({})).rejects.toThrowError("MEMBER_REPOSITORY.METHOD_NOT_IMPLEMENTED")

        await expect(memberRepository.verifyPenalizedStatus("")).rejects.toThrowError("MEMBER_REPOSITORY.METHOD_NOT_IMPLEMENTED")

        await expect(memberRepository.getMembers()).rejects.toThrowError("MEMBER_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    })
})