import { EmailAddress } from "../../main/domain/valueObjects/EmailAddress";

describe("EmailAddress", () => {
    it("should create a valid email address", () => {
        const testValue = "john.doe@email.com";

        const emailAddress = EmailAddress.create(testValue);

        expect(emailAddress.value).toEqual(testValue);
    })

    it("should throw if the email is invalid", () => {
        expect(() => EmailAddress.create("john")).toThrow(EmailAddress.errorMessage);

        expect(() => EmailAddress.create("john@")).toThrow(EmailAddress.errorMessage);

        expect(() => EmailAddress.create("@email.com")).toThrow(EmailAddress.errorMessage);
    })
})