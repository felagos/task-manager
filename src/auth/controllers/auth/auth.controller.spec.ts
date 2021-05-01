import { Test, TestingModule } from "@nestjs/testing";
import { AuthCredentialsDto } from "../../dto/auth-credentials.dto";
import { AuthService } from "../../services/auth/auth.service";
import { AuthController } from "./auth.controller";

const mockAuthService = () => ({
	signUp: jest.fn(),
	signIn: jest.fn().mockResolvedValue({ accessToken: Date.now().toString() }),
});

const authCredentialDto: AuthCredentialsDto = {
	password: "test",
	username: "test",
};

describe("AuthController", () => {
	let controller: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useFactory: mockAuthService }],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("test response signUp", async () => {
		authService.signUp = jest.fn().mockResolvedValue({});
		const response = await controller.signUp(authCredentialDto);

		expect(response).toBeDefined();
	});

	it("test response signIn", async () => {
		authService.signIn = jest
			.fn()
			.mockResolvedValue({ accessToken: Date.now().toString() });
		const response = await controller.signIn(authCredentialDto);

		expect(response.accessToken).toBeDefined();
	});
});
