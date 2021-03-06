import { LoanAmount } from "../../main/domain/valueObjects/LoanAmount";

describe("LoanAmount", () => {
    it("should create a loan amount", () => {
        const testAmount = 2000;
        const loanAmount = LoanAmount.create(testAmount);

        expect(loanAmount.value).toEqual(2000);
    })

    it(`should throw if the loan amount is less than ${LoanAmount.min}`, () => {
        expect(() => LoanAmount.create(999)).toThrow(LoanAmount.minErrorMessage);
    })

    it(`should throw if the loan amount is less than ${LoanAmount.max}`, () => {
        expect(() => LoanAmount.create(10001)).toThrow(LoanAmount.maxErrorMessage);
    })
})