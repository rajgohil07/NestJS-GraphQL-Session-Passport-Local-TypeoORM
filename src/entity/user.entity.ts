import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'User' })
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: 'Primary generated column' })
  @Field(() => Int)
  ID: number;

  @CreateDateColumn({ comment: 'automated date created column' })
  @Field(() => Date)
  DateCreated: Date;

  @UpdateDateColumn({ comment: 'automated date updated column' })
  @Field(() => Date)
  DateUpdated: Date;

  @Column({ comment: 'User email address', nullable: false })
  @Field()
  Name: string;

  @Column({ comment: 'User email address', unique: true, nullable: false })
  @Field()
  Email: string;

  @Column({ comment: 'User email address', type: 'text', nullable: false })
  @Field()
  Password: string;
}
