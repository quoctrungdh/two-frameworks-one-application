import { EmailAddress } from "../domain/valueObjects/EmailAddress";
import { LoanCalculation } from "../domain/entities/LoanCalculation";

export interface LoanRepo {
    findOne(address: EmailAddress): Promise<LoanCalculation | undefined>;

    save(calculation: LoanCalculation): Promise<void>
}