import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  serializeUser(user: any, done: CallableFunction): any {
    console.log(user);
    console.log('\n\n\n-----------serializer here-------------');
    return done(null, user.ID);
  }
  async deserializeUser(payload: any, done: CallableFunction): Promise<any> {
    console.log('\n\n\n-----------deserializeUser-------------');
    const data = await this.userRepository.findOne({ where: { ID: payload } });
    return done(null, data);
  }
}
