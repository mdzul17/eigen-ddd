const { createContainer } = require("instances-container")

const { nanoid } = require("nanoid")
const pool = require("./database/postgres/pool")

const MemberRepository = require('../Domains/members/MemberRepository')
const CheckMembersUseCase = require('../Applications/use_case/CheckMembersUseCase')
const MemberRepositoryPostgres = require('./repository/MemberRepositoryPostgres')

const BookRepository = require('../Domains/books/BookRepository')
const BorrowBooksUseCase = require('../Applications/use_case/BorrowBooksUseCase')
const CheckBooksUseCase = require('../Applications/use_case/CheckBooksUseCase')
const ReturnBooksUseCase = require('../Applications/use_case/ReturnBooksUseCase')
const BookRepositoryPostgres = require("./repository/BookRepositoryPostgres")

const container = createContainer()

container.register([
    {
        key: BookRepository.name,
        Class: BookRepositoryPostgres,
        parameter: {
            dependencies: [{concrete: pool}]
        }
    },
    {
        key: MemberRepository.name,
        Class: MemberRepositoryPostgres,
        parameter: {
            dependencies: [{concrete: pool}, {concrete: nanoid}]
        }
    }
])

container.register([
    {
        key: BorrowBooksUseCase.name,
        Class: BorrowBooksUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'memberRepository',
                    internal: MemberRepository.name
                },
                {
                    name: 'bookRepository',
                    internal: BookRepository.name
                }
            ]
        }
    }, 
    {
        key: CheckBooksUseCase.name,
        Class: CheckBooksUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'bookRepository',
                    internal: BookRepository.name
                }
            ]
        }
    },
    {
        key: CheckMembersUseCase.name,
        Class: CheckMembersUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'bookRepository',
                    internal: BookRepository.name
                },
                {
                    name: 'memberRepository',
                    internal: MemberRepository.name
                }
            ]
        }
    },
    {
        key: ReturnBooksUseCase.name,
        Class: ReturnBooksUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'memberRepository',
                    internal: MemberRepository.name
                },
                {
                    name: 'bookRepository',
                    internal: BookRepository.name
                }
            ]
        }
    }
])

module.exports = container