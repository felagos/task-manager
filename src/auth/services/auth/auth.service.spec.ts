import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthCredentialsDto } from '../../dto/auth-credentials.dto';
import { UserRepository } from '../../repository/user.repository';
import { EncryptService } from '../encrypt/encrypt.service';
import { AuthService } from './auth.service';

const mockUserRepository = () => ({
  singUp: jest.fn(),
  findOne: jest.fn()
});

const mockJwtService = () => ({
  sign: jest.fn().mockReturnValue(Date.now().toString())
});

const mockEncryptService = () => ({
  validatePassword: jest.fn(),
  generateSalt: jest.fn().mockResolvedValue(Date.now().toString()),
  hashPassword: jest.fn().mockResolvedValue(Date.now().toString())
});

const mockUser: any = {
  id: Date.now(),
  username: ""
};

const credentialsDto: AuthCredentialsDto = {
  password: "test",
  username: "test"
};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  let encryptService: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: EncryptService, useFactory: mockEncryptService },
        { provide: JwtService, useFactory: mockJwtService },
        { provide: UserRepository, useFactory: mockUserRepository }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    encryptService = module.get<EncryptService>(EncryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('singUp', () => {

    it("do signup user", async () => {
      await service.signUp(credentialsDto);
      expect(userRepository.singUp).toHaveBeenCalled();
    });

  });

  describe('sigin', () => {

    it("error sigin valid credentials", async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      encryptService.validatePassword = jest.fn().mockResolvedValue(true);

      const response = await service.signIn(credentialsDto);

      expect(response.accessToken).toBeDefined();
    });

    it("error sigin invalid credentials", async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      encryptService.validatePassword = jest.fn().mockResolvedValue(false);

      expect(service.signIn(credentialsDto)).rejects.toThrow(UnauthorizedException);
    });

    it("error sigin user not found", async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(false);

      expect(service.signIn(credentialsDto)).rejects.toThrow(NotFoundException);
    });

  });

});
