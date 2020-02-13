import { CalculateLoanReq } from "../../main/useCases/CalculateLoanReq";
import { calculateLoan }  from "../../main/useCases/calculateLoan";
import { EmailAddress } from "../../main/domain/valueObjects/EmailAddress";
import { Context } from "../../main/Context";

describe("calculateLoan", () => {
    let request: CalculateLoanReq;

    beforeEach(() => {
        request = {
            emailAddress: "john.doe@emial.com",
            loanAmount: 10000,
            loanTerm: 5,
            lifeInsuranceOptIn: true,
        }
    })

    it("should calculate the mothly payment", async () => {
        const calculation = await calculateLoan(request);

        const expectedInterestRate = 12;
        const expectedMonthlyPayment = 222.44;

        expect(calculation.interestRate).toEqual(expectedInterestRate);
        expect(calculation.monthlyPayment).toEqual(expectedMonthlyPayment);
    })

    it("should save the calculation", async () => {
        const calculation = await calculateLoan(request);
        const address = EmailAddress.create(calculation.emailAddress);
        const savedCalculation = await Context.loanRepo.findOne(address);

        expect(savedCalculation?.emailAddress.value).toEqual(request.emailAddress);
    })

    it("should send an email to the provided email address", async () => {
        const spy = jest.spyOn(Context.emailServ, 'send');

        const calculation = await calculateLoan(request);
        const expectedEmail = Context.emailServ.generateEmail(calculation);

        expect(spy).toHaveBeenCalledWith(expectedEmail);
    })
})