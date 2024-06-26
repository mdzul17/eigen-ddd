const InvariantError = require("../../../Commons/exceptions/InvariantError");
const pool = require("../../database/postgres/pool");
const MemberRepositoryPostgres = require("../MemberRepositoryPostgres");
const MembersTableTestHelper = require("../../../../tests/MembersTableTestHelper");

describe("MemberRepositoryPostgres", () => {
    afterEach( async () => {
        await MembersTableTestHelper.cleanTable()
    })

    afterAll( async () => {
        await pool.end()
    })

    describe("addMember function", () => {
        it("should return added member data", async() => {
            
            const fakeIdGenerator = () => "001"
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, fakeIdGenerator)
            
            await memberRepositoryPostgres.addMember({
                name: "Angga"
            })

            const member = await MembersTableTestHelper.findMemberById("M001")

            expect(member).toHaveProperty("name")
            expect(member).toHaveProperty("code")
        })

        it("should registered member correctly", async() => {
            
            const fakeIdGenerator = () => "001"
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, fakeIdGenerator)
            
            const registeredMember = await memberRepositoryPostgres.addMember({
                name: "Angga"
            })

            expect(registeredMember).toStrictEqual(
                {
                    code: "M001",
                    name: "Angga"
                }
            )
        })
    })

    describe("verifyPenalizedStatus function", () => {
        it("should throw error when penalty status  = 1 and is still in penalty duration", async() => {
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, {})
            let threeDaysAfter = new Date()
            let penalty_date = new Date()
            penalty_date.setDate(threeDaysAfter.getDate() - 1)
            
            await MembersTableTestHelper.addMember({code :"M001", name: "Angga", penalty_status: "1", penalty_date: penalty_date.toISOString()})

            await expect(memberRepositoryPostgres.verifyPenalizedStatus({
                code: "M001"
            })).rejects.toThrow(InvariantError)
        })

        it("should not throw error when penalty status = 1 but not in penalty duration  ", async() => {
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, {})
            let threeDaysAfter = new Date()
            let penalty_date = new Date()
            penalty_date.setDate(threeDaysAfter.getDate() - 5)
            
            await MembersTableTestHelper.addMember({code: "M001",
            name: "Angga",
            penalty_status: "1",
            penalty_date: penalty_date.toISOString()
        })

            await expect(memberRepositoryPostgres.verifyPenalizedStatus({
                code: "M001"
            })).resolves.not.toThrow(InvariantError)
        })
    })

    describe("getMembers function", () => {
        it("should returns members data", async() => {
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({
            code: "M001",
            name: "Angga",
            penalty_status: "1",
            penalty_date: "2021-08-08T07:19:09.775Z"
            })

            const members = await memberRepositoryPostgres.getMembers()

            expect(members).toHaveLength(1)
            expect(members[0]).toHaveProperty("code")
            expect(members[0]).toHaveProperty("name")
            expect(members[0]).toHaveProperty("penalty_status")
            expect(members[0]).toHaveProperty("penalty_date")
        })

        it("should return 0 length when no members data", async() => {
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, {})
            const members = await memberRepositoryPostgres.getMembers()

            expect(members).toHaveLength(0)
        })
    })

    describe("setPenaltyStatus function", () => {
        it("should set penalty status to 1", async() => {
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({
            code: "M001",
            name: "Angga",
            penalty_status: "0"
            })

            const members = await memberRepositoryPostgres.setPenaltyStatus({
                code: "M001"
            })

            expect(members).toHaveLength(1)
            expect(members[0]).toHaveProperty("code")
            expect(members[0]).toHaveProperty("penalty_status")
            expect(members[0]).toHaveProperty("penalty_date")
            expect(members[0].penalty_date).not.toBeNull()
        })
        
        it("should set penalty status to 0", async() => {
            const memberRepositoryPostgres = new MemberRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({
            code: "M001",
            name: "Angga",
            penalty_status: "0"
            })

            const members = await memberRepositoryPostgres.setPenaltyStatus({
                code: "M001",
                penalty_status: "1"
            })

            expect(members).toHaveLength(1)
            expect(members[0]).toHaveProperty("code")
            expect(members[0]).toHaveProperty("penalty_status")
            expect(members[0]).toHaveProperty("penalty_date")
        })
    })
})