import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class EncryptService {
	async hashPassword(password: string, salt: string): Promise<string> {
		return await bcrypt.hash(password, salt);
	}

	async generateSalt(): Promise<string> {
		return await bcrypt.genSalt();
	}

	async validatePassword(
		password: string,
		hashedPassword: string,
		salt: string
	): Promise<boolean> {
		const hash = await bcrypt.hash(password, salt);
		return hash === hashedPassword;
	}
}
