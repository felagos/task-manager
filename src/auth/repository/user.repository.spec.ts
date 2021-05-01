import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { DatabaseError } from "../../enums/database-error.enum";
import { AuthCredentialSalt, AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { UserRepository } from "./user.repository";

const credentialsDto: AuthCredentialSalt = {
    password: "test",
    username: "test",
    salt: ""
};

describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [UserRepository]
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
    });


    it("successfully sign up the user", () => {
        const save = jest.fn().mockResolvedValue(null);
        userRepository.create = jest.fn().mockReturnValue({ save });

        expect(userRepository.singUp(credentialsDto)).resolves.not.toThrow();
    });

    it("throws conflict exception sign up the user", () => {
        const save = jest.fn().mockRejectedValue({ code: DatabaseError.DUPLICATED });
        userRepository.create = jest.fn().mockReturnValue({ save });

        expect(userRepository.singUp(credentialsDto)).rejects.toThrow(ConflictException);
    });

    it("throws internal server exception sign up the user", () => {
        const save = jest.fn().mockRejectedValue({});
        userRepository.create = jest.fn().mockReturnValue({ save });

        expect(userRepository.singUp(credentialsDto)).rejects.toThrow(InternalServerErrorException);
    });

});