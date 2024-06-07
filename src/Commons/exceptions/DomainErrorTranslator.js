const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  "BORROW_BOOKS_USE_CASE.CAN_NOT_BORROW_MORE_THAN_2": new InvariantError(
    "Can not borrow more than 2 books!"
  ),
  "ADD_MEMBER_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION": new InvariantError(
    "Wrong payload data type! Please check your input!"
  ),
  "ADD_BOOK_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION": new InvariantError(
    "Wrong payload data type! Please check your input!"
  ),
};

module.exports = DomainErrorTranslator;
