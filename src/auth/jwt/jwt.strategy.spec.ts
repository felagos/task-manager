import { UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { JwtPayload } from "../../models/payload.model";
import { UserRepository } from "../repository/user.repository";
import { JwtStrategy } from "./jwt.strategy";

const mockTaskRespository = () => ({
	findOne: jest.fn(),
});

const payload: JwtPayload = {
	username: "test",
};

const user = {
	username: "test",
};

describe("JwtStrategy", () => {
	let userRepository: UserRepository;
	let jwtStatefy: JwtStrategy;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				JwtStrategy,
				{ provide: UserRepository, useFactory: mockTaskRespository },
			],
		}).compile();

		userRepository = module.get<UserRepository>(UserRepository);
		jwtStatefy = module.get<JwtStrategy>(JwtStrategy);
	});

	it("successfully validate user", async () => {
		userRepository.findOne = jest.fn().mockResolvedValue(user);
		const response = await jwtStatefy.validate(payload);

		expect(response.username).toEqual(payload.username);
	});

	it("unsuccessfully validate user", async () => {
		userRepository.findOne = jest.fn().mockResolvedValue(null);

		expect(jwtStatefy.validate(payload)).rejects.toThrow(UnauthorizedException);
	});
});
