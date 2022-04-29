import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { hashPassword } from 'src/common/helper';
import { UserEntity } from 'src/entity/user.entity';
import { Not, Repository } from 'typeorm';
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

  // get all user data expect current user
  async getAllUserData(UserID: number): Promise<UserEntity[]> {
    const findAllData = await this.userRepository.find({
      where: { ID: Not(UserID) },
      select: ['ID', 'Name', 'Email'],
    });
    return findAllData;
  }
}
