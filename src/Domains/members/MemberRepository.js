class MemberRepository {
    async addMember(payload) {
        throw new Error("MEMBER_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async verifyPenalizedStatus(id) {
        throw new Error("MEMBER_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }

    async getMembers() {
        throw new Error("MEMBER_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }
    
    async setPenaltyStatus() {
        throw new Error("MEMBER_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    }
}

module.exports = MemberRepository