import { LoanTerm } from "../../main/domain/valueObjects/LoanTerm";

describe("LoanTerm", () => {
    it("should create a valid loan term", () => {
        const testValues = {
            loanTerm1: 1,
            loanTerm36: 3,
            loanTerm60: 5,
        };

        const loanTerm1 = LoanTerm.create(testValues.loanTerm1);
        const loanTerm36 = LoanTerm.create(testValues.loanTerm36);
        const loanTerm60 = LoanTerm.create(testValues.loanTerm60);

        expect(loanTerm1.value).toEqual(testValues.loanTerm1);
        expect(loanTerm36.value).toEqual(testValues.loanTerm36);
        expect(loanTerm60.value).toEqual(testValues.loanTerm60);
    })

    it("should return 12 months for 1 year term", () => {
        const oneYearTerm = LoanTerm.create(1);
        expect(oneYearTerm.convertToMonths()).toEqual(12);
    })

    it("should throw if the loan term is invalid", () => {
        expect(() => LoanTerm.create(0)).toThrow(LoanTerm.errorMessage);

        expect(() => LoanTerm.create(1.5)).toThrow(LoanTerm.errorMessage);

        expect(() => LoanTerm.create(6)).toThrow(LoanTerm.errorMessage);
    })
})