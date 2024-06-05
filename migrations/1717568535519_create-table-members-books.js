/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("books_members", {
        code_member: {
            type: "VARCHAR(50)"
        },
        code_book: {
            type: "VARCHAR(50)"
        },
        borrow_date: {
            type: "datetime",
            default: pgm.func("current_timestamp"),
        }
    })

    pgm.addConstraint("books_members", "fk_books_members.code_member_members.code", "FOREIGN KEY(code_member) REFERENCES members(code) ON DELETE CASCADE")
    pgm.addConstraint("books_members", "fk_books_members.code_book_books.code", "FOREIGN KEY(code_book) REFERENCES books(code) ON DELETE CASCADE")
};

exports.down = pgm => {
    pgm.dropConstraint("books_members", "fk_books_members.code_member_members.code");
    pgm.dropConstraint("books_members", "fk_books_members.code_book_books.code");
    pgm.dropTable("books_members")
};
