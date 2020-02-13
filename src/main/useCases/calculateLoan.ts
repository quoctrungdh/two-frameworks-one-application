import { Context } from "../Context";
import { CalculateLoanReq } from "./CalculateLoanReq";
import { CalculateLoanRes } from "./CalculateLoanRes";
import { LoanCalculation } from "../domain/entities/LoanCalculation";

export async function calculateLoan(request: CalculateLoanReq): Promise<CalculateLoanRes> {
    const calculation = LoanCalculation.create(request);

    await Context.loanRepo.save(calculation);

    const response: CalculateLoanRes = CalculateLoanRes.create(calculation);

    const email: string = Context.emailServ.generateEmail(response);

    await Context.emailServ.send(email);

    return response;
}