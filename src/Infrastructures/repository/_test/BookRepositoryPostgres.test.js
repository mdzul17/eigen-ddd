const InvariantError = require("../../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const pool = require("../../database/postgres/pool");
const BookRepositoryPostgres = require("../BookRepositoryPostgres");
const BooksTableTestHelper = require("../../../../tests/BooksTableTestHelper");
const MembersTableTestHelper = require("../../../../tests/MembersTableTestHelper");
const BooksMembersTableTestHelper = require("../../../../tests/BooksMembersTableTestHelper");

describe("BookRepositoryPostgres", () => {
    afterEach(async() => {
        await BooksMembersTableTestHelper.cleanTable();
        await BooksTableTestHelper.cleanTable();
        await MembersTableTestHelper.cleanTable()
    })

    afterAll(async() => {
        await pool.end()
    })

    describe("addBook function", () =>{
        it("Should persist add book",  async () => {
            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)
            
            await bookRepositoryPostgres.addBook({
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            })

            const book = await BooksTableTestHelper.findBookById("JK-45")

            expect(book).toHaveProperty("code")
            expect(book).toHaveProperty("title")
            expect(book).toHaveProperty("author")
            expect(book).toHaveProperty("stock")
        })

        it("Should added book correctly", async() => {
            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)
            
            const registeredMember = await bookRepositoryPostgres.addBook({
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            })

            expect(registeredMember).toStrictEqual(
                {
                    code: "JK-45",
                    title: "Harry Potter",
                    author: "J.K Rowling",
                    stock: 1
                }
            )
        })
    })
    describe("getBooks function", () =>{
        it("should returns books data", async() => {
            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)
            
            await BooksTableTestHelper.addBook({
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            })

            const books = await bookRepositoryPostgres.getBooks()

            expect(books).toHaveLength(1)
            expect(books[0]).toHaveProperty("code")
            expect(books[0]).toHaveProperty("title")
            expect(books[0]).toHaveProperty("author")
            expect(books[0]).toHaveProperty("stock")
        })

        it("should return 0 length when no books data", async() => {
            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)
            const books = await bookRepositoryPostgres.getBooks()

            expect(books).toHaveLength(0)
        })
    })
    describe("verifyBorrowedBooks function", () =>{
        it("Should throw error when books is borrowed by others", async() => {
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            })
            await BooksMembersTableTestHelper.addMembersBooks({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            await expect(bookRepositoryPostgres.verifyBorrowedBooks([{code: "JK-45"}])).rejects.toThrow(InvariantError)
        })

        it("Should not throw error when books is available", async() => {
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({})
            await BooksMembersTableTestHelper.addMembersBooks({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            await expect(bookRepositoryPostgres.verifyBorrowedBooks([{code: "NRN-7"}])).resolves.not.toThrow(InvariantError)
        })
    })
    describe("checkBorrowedBooksByMember function", () =>{
        it("Should throw error when the books are not same with borrowed one", async() => {
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({})
            await BooksMembersTableTestHelper.addMembersBooks({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            await expect(bookRepositoryPostgres.checkBorrowedBooksByMember("M001",[{code: "TW-11"}])).rejects.toThrow(InvariantError)
        })
        it("Should not throw error when the books are same with borrowed one", async() => {
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({})
            await BooksMembersTableTestHelper.addMembersBooks({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            await expect(bookRepositoryPostgres.checkBorrowedBooksByMember("M001",[{code: "JK-45"}])).resolves.not.toThrow(InvariantError)
        })
    })
    describe("borrowBook function", () =>{
        it("Should return borrowed book action data", async() => {   
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            const borrowBook = await bookRepositoryPostgres.borrowBook("M001",[{code: "JK-45"}])

            expect(borrowBook).toStrictEqual([{ code_book: "JK-45"}]
            )
        })

        it("Should confirm the book succesfully borrowed", async() => {   
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            await bookRepositoryPostgres.borrowBook("M001",[{code: "JK-45"}])

            const checkBorrowedBook = await BooksMembersTableTestHelper.findBorrowedBooks({code_member: "M001", code_book: "JK-45"})

            expect(checkBorrowedBook).toHaveLength(1)
        })
    })
    describe("returnsBook function", () =>{
        it("Should return error when book not found", async() => {   
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({})
            await BooksMembersTableTestHelper.addMembersBooks({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            await expect(bookRepositoryPostgres.returnsBook("M001",[{code: "NRN-7"}])).rejects.toThrow(NotFoundError)
        })

        it("Should not return error when book found", async() => {   
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await BooksTableTestHelper.addBook({})
            await BooksMembersTableTestHelper.addMembersBooks({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            await expect(bookRepositoryPostgres.returnsBook("M001",[{code: "JK-45"}])).resolves.not.toThrow(NotFoundError)
        })
    })
    describe("checkBorrowingDuration function", () =>{
        it("Should have property duration", async() =>{
            await MembersTableTestHelper.addMember({})
            await BooksTableTestHelper.addBook({})
            await BooksMembersTableTestHelper.addMembersBooks({code_member: "M001",
            code_book: "JK-45",
            borrow_date: "2021-08-08T07:19:09.775Z"})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            const duration = await bookRepositoryPostgres.checkBorrowingDuration("M001", [{code: "JK-45"}])

            expect(duration[0]).toHaveProperty("duration")
        })
    })
    describe("getCountAllBooks function", () =>{
        it("Should have property quantities and its value 1", async() => {
            await BooksTableTestHelper.addBook({})
            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            const counts = await bookRepositoryPostgres.getCountAllBooks()

            expect(counts).toHaveLength(1)
            expect(counts[0]).toHaveProperty("quantities")
            expect(counts[0].quantities).toEqual("1")
        })
    })
    describe("getCountBorrowedBooks function", () =>{
        it("Should have property quantities and its value 1", async() => {
            await MembersTableTestHelper.addMember({})
            await BooksTableTestHelper.addBook({})
            await BooksMembersTableTestHelper.addMembersBooks({})

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            const counts = await bookRepositoryPostgres.getCountBorrowedBooks()

            expect(counts).toHaveLength(1)
            expect(counts[0]).toHaveProperty("quantities")
            expect(counts[0].quantities).toEqual("1")
        })
    })
    describe("getCountBorrowedBooksByMember function", () =>{
        it("Should have length 2 and have code_member and quantities properties", async() => {
            await MembersTableTestHelper.addMember({
                code: "M001",
                name: "Angga",
            })
            await MembersTableTestHelper.addMember({
                code: "M002",
                name: "Ferry",
            })
            await BooksTableTestHelper.addBook({
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            })
            await BooksTableTestHelper.addBook({
                code: "SHR-1",
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle",
                stock: 1
            })
            await BooksTableTestHelper.addBook({
                code: "TW-11",
                title: "Twilight",
                author: "Stephenie Meyer",
                stock: 1
            })
            await BooksMembersTableTestHelper.addMembersBooks({
                code_member: "M001",
                code_book: "JK-45"
            })
            await BooksMembersTableTestHelper.addMembersBooks({
                code_member: "M001",
                code_book: "SHR-1"
            })
            await BooksMembersTableTestHelper.addMembersBooks({
                code_member: "M002",
                code_book: "TW-11"
            })

            const bookRepositoryPostgres = new BookRepositoryPostgres(pool)

            const counts = await bookRepositoryPostgres.getCountBorrowedBooksByMember()

            expect(counts).toHaveLength(2)
            expect(counts[0]).toHaveProperty("code_member")
            expect(counts[0]).toHaveProperty("quantities")
        })
    })
})