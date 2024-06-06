const pool = require("../../database/postgres/pool")
const MembersTableTestHelper = require("../../../../tests/MembersTableTestHelper")
const BooksTableTestHelper = require("../../../../tests/BooksTableTestHelper")
const BooksMembersTableTestHelper = require("../../../../tests/BooksMembersTableTestHelper")
const createServer = require("../createServer")
const request = require("supertest")

let app;

describe("/member endpoint", () => {
    afterAll(async() => {
        await pool.end()
    })

    afterEach(async () => {
        await MembersTableTestHelper.cleanTable();
        await BooksTableTestHelper.cleanTable();
        await BooksMembersTableTestHelper.cleanTable();
    });

    beforeAll(async() => {
        app = await createServer()
    })

    it("Should return status code 200", async() => {
        await MembersTableTestHelper.addMember({})

        const response = await request(app).get('/api/v1/member')
        console.log(response.body)
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    })

    it("should have members property and have its length by 1", async () => {
        await MembersTableTestHelper.addMember({})

        const response = await request(app).get('/api/v1/member')
        
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("members");
        expect(response.body.data.members).toHaveLength(1)
    })

    it("should have members property but 0 length", async () => {
        const response = await request(app).get('/api/v1/member')
        
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("members");
        expect(response.body.data.members).toHaveLength(0)
    })
})