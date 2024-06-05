class CheckMembersUseCase {

    constructor({bookRepository, memberRepository}) {
        this._bookRepository = bookRepository
        this._memberRepository = memberRepository
    }

    async execute() {
        const borrowedBooks = await this._bookRepository.getCountBorrowedBooksByMember();
        let members = await this._memberRepository.getMembers();
    
        members = members.map((member) => {
            const getQty = borrowedBooks.filter((memberid) => memberid.memberCode == member.code)
            member.quantities = getQty[0] ? parseInt(getQty[0].quantities) : 0

            return member
        })

        return {
            members: members
        }
    }
}

module.exports = CheckMembersUseCase