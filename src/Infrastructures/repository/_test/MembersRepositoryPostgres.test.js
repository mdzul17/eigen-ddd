const InvariantError = require("../../../Commons/exceptions/InvariantError");
const pool = require("../../database/postgres/pool");
const MembersRepositoryPostgres = require("../MembersRepositoryPostgres");
const MembersTableTestHelper = require("../../../../tests/MembersTableTestHelper");

describe("MembersRepositoryPostgres", () => {
    afterEach( async () => {
        await MembersTableTestHelper.cleanTable()
    })

    afterAll( async () => {
        await pool.end()
    })

    describe("addMember function", () => {
        it("should return added member data", async() => {
            
            const fakeIdGenerator = () => "001"
            const membersRepositoryPostgres = new MembersRepositoryPostgres(pool, fakeIdGenerator)
            
            await membersRepositoryPostgres.addMember({
                name: "Angga"
            })

            const member = await MembersTableTestHelper.findMemberById("M001")
            expect(member).toStrictEqual({
                code: "M001",
                name: "Angga"
            })
        })

        it("should persist added member data operation", async() => {
            
            const fakeIdGenerator = () => "001"
            const membersRepositoryPostgres = new MembersRepositoryPostgres(pool, fakeIdGenerator)
            
            await membersRepositoryPostgres.addMember({
                name: "Angga"
            })

            const member = await MembersTableTestHelper.findMemberById("M001")
            expect(member).toHaveLength(1)
        })
    })

    describe("verifyPenalizedStatus function", () => {
        it("should return penalty status = 0 ", async() => {
            const membersRepositoryPostgres = new MembersRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({code :"M001", name: "Angga"})

            const isPenalty = await membersRepositoryPostgres.verifyPenalizedStatus({
                code: "M001"
            })

            expect(isPenalty.penalty_status).toStrictEqual(0)
        })

        it("should return penalty status = 1  ", async() => {
            const membersRepositoryPostgres = new MembersRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({code: "M001",
            name: "Angga",
            penalty_status: "1",
            penalty_date: "2021-08-08T07:19:09.775Z"
        })

            const isPenalty = await membersRepositoryPostgres.verifyPenalizedStatus({
                code: "M001"
            })

            expect(isPenalty.penalty_status).toStrictEqual(1)
        })
    })

    describe("getMembers function", () => {
        it("should returns members data", async() => {
            const membersRepositoryPostgres = new MembersRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({
            code: "M001",
            name: "Angga",
            penalty_status: "1",
            penalty_date: "2021-08-08T07:19:09.775Z"
            })

            const members = await membersRepositoryPostgres.getMembers()

            expect(members).toHaveLength(1)
            expect(members).toHaveProperty("code")
            expect(members).toHaveProperty("name")
            expect(members).toHaveProperty("penalty_status")
            expect(members).toHaveProperty("penalty_date")
        })

        it("should return 0 length when no members data", async() => {
            const membersRepositoryPostgres = new MembersRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({
            code: "M001",
            name: "Angga",
            penalty_status: "1",
            penalty_date: "2021-08-08T07:19:09.775Z"
            })

            const members = await membersRepositoryPostgres.getMembers()

            expect(members).toHaveLength(0)
        })
    })

    describe("setPenaltyStatus function", () => {
        it("should set penalty status to 1", async() => {
            const membersRepositoryPostgres = new MembersRepositoryPostgres(pool, {})
            
            await MembersTableTestHelper.addMember({
            code: "M001",
            name: "Angga",
            penalty_status: "0"
            })

            const members = await membersRepositoryPostgres.setPenaltyStatus("M001")

            expect(members).toHaveLength(1)
            expect(members).toHaveProperty("code")
            expect(members).toHaveProperty("penalty_status")
            expect(members).toHaveProperty("penalty_date")
            expect(members.penalty_date).not.toBeNull()
        })
    })
})