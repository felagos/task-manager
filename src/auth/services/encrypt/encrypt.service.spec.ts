import { Test, TestingModule } from "@nestjs/testing";
import { EncryptService } from "./encrypt.service";

describe("EncryptService", () => {
	let service: EncryptService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EncryptService],
		}).compile();

		service = module.get<EncryptService>(EncryptService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("get salt", async () => {
		const salt = await service.generateSalt();

		expect(salt).not.toBeNull();
	});

	it("generate hash", async () => {
		const salt = await service.generateSalt();
		const hashed = await service.hashPassword("123123", salt);

		expect(hashed).not.toBeNull();
	});

	it("validate password", async () => {
		const password = "123123";
		const salt = await service.generateSalt();
		const hashed = await service.hashPassword(password, salt);

		const response = await service.validatePassword(password, hashed, salt);

		expect(response).toBeTruthy();
	});
});
