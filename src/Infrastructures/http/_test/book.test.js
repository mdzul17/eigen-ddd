const pool = require("../../database/postgres/pool")
const MembersTableTestHelper = require("../../../../tests/MembersTableTestHelper")
const BooksTableTestHelper = require("../../../../tests/BooksTableTestHelper")
const BooksMembersTableTestHelper = require("../../../../tests/BooksMembersTableTestHelper")
const createServer = require("../createServer")
const request = require("supertest")

let app;

describe("/book endpoint", () => {
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
            await BooksTableTestHelper.addBook({})
    
            const response = await request(app).get('/api/v1/book')
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
        })
        it("Should have property books and quantities", async() => {
            await BooksTableTestHelper.addBook({})

            const response = await request(app).get('/api/v1/book')
            
            expect(response.body.data).toHaveProperty("books")
            expect(response.body.data).toHaveProperty("quantities")
        })
    })

    describe("POST /borrow", () => {
        it("Should return status code 201", async() => {
            await BooksTableTestHelper.addBook({})
            await MembersTableTestHelper.addMember({})

            const payload = {
                code: "M001",
                books: [{
                    code: "JK-45",
                    title: "Harry Potter",
                    author: "J.K Rowling",
                }]
            }
    
            const response = await request(app).post('/api/v1/book/borrow').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
        })

        it("Should have property borrower and books", async() => {
            await BooksTableTestHelper.addBook({})
            await MembersTableTestHelper.addMember({})

            const payload = {
                code: "M001",
                books: [{
                    code: "JK-45",
                    title: "Harry Potter",
                    author: "J.K Rowling",
                }]
            }
    
            const response = await request(app).post('/api/v1/book/borrow').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(201);
            expect(response.body.data).toHaveProperty("borrower");
            expect(response.body.data).toHaveProperty("books");
            expect(response.body.data.books).toHaveLength(1);
        })
    })

    describe("DELETE /return", () => {
        it("Should return status code 200", async() => {
            await BooksTableTestHelper.addBook({})
            await MembersTableTestHelper.addMember({})
            await BooksMembersTableTestHelper.addMembersBooks({})

            const payload = {
                code: "M001",
                books: [{
                    code: "JK-45",
                    title: "Harry Potter",
                    author: "J.K Rowling",
                }]
            }
    
            const response = await request(app).delete('/api/v1/book/return').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
        })
    })

    describe("POST /", () => {
        it("Should return status code 201", async() => {
            const payload = {
                    code: "JK-45",
                    title: "Harry Potter",
                    author: "J.K Rowling",
                    stock: 1
            }
    
            const response = await request(app).post('/api/v1/book').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
        })

        it("Should have all payload properties", async() => {
            const payload = {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            }
    
            const response = await request(app).post('/api/v1/book').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(201);
            expect(response.body.data).toHaveProperty("code");
            expect(response.body.data).toHaveProperty("title");
            expect(response.body.data).toHaveProperty("author");
            expect(response.body.data).toHaveProperty("stock");
        })

        it("Should return 400 error when sending a bad payload", async() => {
            const payload = {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: "1"
            }
    
            const response = await request(app).post('/api/v1/book').send(payload).set('Accept', 'application/json')
            
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual("Wrong payload data type! Please check your input!")
        })
    })
})