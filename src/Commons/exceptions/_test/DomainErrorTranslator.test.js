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
        new Error("ADD_MEMBER_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "Wrong payload data type! Please check your input!"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_BOOK_USE_CASE.DOES_NOT_MEET_DATA_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "Wrong payload data type! Please check your input!"
      )
    );
  });

  it("should return original error when error message is not needed to translate", () => {
    const error = new Error("some_error_message");

    const translatedError = DomainErrorTranslator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
