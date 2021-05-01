import {
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";

export class AuthCredentialsDto {
	@IsNotEmpty({ message: "Required field" })
	@IsString({ message: "Must be a string" })
	@MinLength(4, { message: "Min lenght of 4" })
	@MaxLength(20, { message: "Max lenght of 20" })
	username: string;

	@IsNotEmpty({ message: "Required field" })
	@MinLength(8, { message: "Min lenght of 8" })
	@MaxLength(20, { message: "Max lenght of 20" })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			"Must be at least 1 uppser case letter and at least 1 lower case letter and at least 1 number or special character",
	})
	password: string;
}

export class AuthCredentialSalt extends AuthCredentialsDto {
	salt: string;
}
