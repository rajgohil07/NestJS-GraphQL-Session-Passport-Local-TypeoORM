import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInput } from 'src/auth/dto/createinput';
import { constant } from 'src/common/constant';
import { comparePassword, hashPassword } from 'src/common/helper';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/createUser';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // user register functionality
  async createUser(createObj: CreateUser): Promise<UserEntity> {
    const { Name, Email, Password } = createObj;
    const lowerEmail = Email.toLowerCase();
    const findOneData = await this.userRepository.findOne({
      where: { Email: lowerEmail },
      select: ['Email'],
    });
    if (findOneData && findOneData.Email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }
    const hashPasswordValue = await hashPassword(Password);
    const dataObject: CreateUser = {
      Name,
      Email: lowerEmail,
      Password: hashPasswordValue,
    };
    const createUserQuery = this.userRepository.create(dataObject);
    const saveUserData = await this.userRepository.save(createUserQuery);
    return saveUserData;
  }

  // user login functionality
  async userLogin(loginInput: LoginInput): Promise<UserEntity> {
    const { Email, Password } = loginInput;
    const lowerEmail = Email.toLowerCase();
    const findUserData = await this.userRepository.findOne({
      where: {
        Email: lowerEmail,
      },
      select: ['ID', 'Email', 'Name', 'Password'],
    });
    if (!findUserData) {
      throw new NotFoundException(constant.EMAIL_NOT_FOUND);
    }
    const IsValidPassword = await comparePassword(
      Password,
      findUserData.Password,
    );
    if (!IsValidPassword) {
      throw new BadGatewayException(constant.PROVIDED_WRONG_PASSWORD);
    }
    delete findUserData.Password;
    // console.log('context body\n\n\n');
    return findUserData;
  }
}
