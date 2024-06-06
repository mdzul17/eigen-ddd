const DomainErrorTranslator = require("../DomainErrorTranslator");
const InvariantError = require("../InvariantError");

describe("DomainErrorTranslator", () => {
  it("should translate error correctly", () => {
    expect(
      DomainErrorTranslator.translate(
        new Error("BORROW_BOOKS_USE_CASE.CAN_NOT_BORROW_MORE_THAN_2")
      )
    ).toStrictEqual(
      new InvariantError(
        "Can not borrow more than 2 books!"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("BORROW_BOOKS_USE_CASE.MEMBER_BEING_PENALIZED")
      )
    ).toStrictEqual(
      new InvariantError(
        "Can not borrow! Member currently being penalized!"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("RETURN_BOOKS_USE_CASE.NOT_BORROWED_BOOKS")
      )
    ).toStrictEqual(
      new InvariantError(
        "The book is not the same with the borrowed one!"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("BORROW_BOOKS_USE_CASE.BOOK_BEING_BORROWED_BY_OTHERS")
      )
    ).toStrictEqual(
      new InvariantError(
        "The book being borrowed by others!"
      )
    );
  });

  it("should return original error when error message is not needed to translate", () => {
    const error = new Error("some_error_message");

    const translatedError = DomainErrorTranslator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
