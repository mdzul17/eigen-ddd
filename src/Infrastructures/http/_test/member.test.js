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

    describe("GET /", () => {
        it("Should return status code 200", async() => {
            await MembersTableTestHelper.addMember({})
    
            const response = await request(app).get('/api/v1/member')
            
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

    describe("POST /", () => {
        it("Should return status code 201", async() => {
            const payload = {
                    name: "Angga",
            }
    
            const response = await request(app).post('/api/v1/member').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
        })

        it("Should have property code and name", async() => {
            const payload = {
                name: "Angga"
            }
    
            const response = await request(app).post('/api/v1/member').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(201);
            expect(response.body.data).toHaveProperty("code");
            expect(response.body.data).toHaveProperty("name");
        })

        it("Should return 400 error when sending a bad payload", async() => {
            const payload = {
                name: 1,
            }
    
            const response = await request(app).post('/api/v1/member').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual("Wrong payload data type! Please check your input!")
        })
    })
})