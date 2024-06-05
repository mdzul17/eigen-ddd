/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("members", {
        code: {
            type: "VARCHAR(50)",
            primaryKey: true
        },
        name: {
            type: "VARCHAR(50)",
            notNull: true
        },
        penalty_status: {
            type: "CHAR",
            default: "0"
        },
        penalty_date: {
            type: "datetime",
        }
    })
};

exports.down = pgm => {
    pgm.dropTable("members")
};
