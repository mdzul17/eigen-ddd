class AddMemberUseCase {
    constructor({memberRepository}){
        this._memberRepository = memberRepository
    }

    async execute(payload) {
        this._verifyPayload(payload)
        const addMember = await this._memberRepository.addMember(payload)

        return addMember
    }

    _verifyPayload(payload) {
        if(typeof payload.name != "string") {
            throw new Error("ADD_MEMBER_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION")
        }
    }
}

module.exports = AddMemberUseCase