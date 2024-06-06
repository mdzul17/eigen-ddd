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
  "BORROW_BOOKS_USE_CASE.MEMBER_BEING_PENALIZED": new InvariantError(
    "Can not borrow! Member currently being penalized!"
  ),
  "RETURN_BOOKS_USE_CASE.NOT_BORROWED_BOOKS": new InvariantError(
    "The book is not the same with the borrowed one!"
  ),
  "BORROW_BOOKS_USE_CASE.BOOK_BEING_BORROWED_BY_OTHERS": new InvariantError(
    "The book being borrowed by others!"
  )
};

module.exports = DomainErrorTranslator;
