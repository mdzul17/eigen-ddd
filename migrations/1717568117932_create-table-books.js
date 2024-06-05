/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("books", {
        code: {
            type: "VARCHAR(50)",
            primaryKey: true
        },
        title: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        author: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        stock: {
            type: "INTEGER",
            default: 0
        }
    })
};

exports.down = pgm => {
    pgm.dropTable("books")
};
