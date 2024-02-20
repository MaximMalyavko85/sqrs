import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ERoles, IUser, UserAggregate } from "../domain";
import {  FindManyOptions, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@common/providers/typeorm";

// Adapter - this is API for this microservice
//If nessesary change thomething, we can create new adapter and will include to module

@Injectable()
export class UserAdapter implements UserRepository {
  private readonly logger = new Logger(UserAdapter.name);

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async save(newUser: IUser): Promise<UserAggregate> {
    const userWithUsersRole = {...newUser, role: ERoles.user};

    const createdUser =  await this.userRepository.save(userWithUsersRole);

    return UserAggregate.create(createdUser);
  }

  async findOne(id: string | number): Promise<any> {}

  async findOneWhere(where: object): Promise<any> {
    const user = await this.userRepository.findOne({ where}) as IUser;
    
    if (!user) return;

    return UserAggregate.create(user);
  }

  async findAll(pagination: any): Promise <{data: UserAggregate[], count: number}> { // Promise<[UserAggregate[], number]
    const {limit: take, offset: skip} = pagination;

    const options: FindManyOptions<UserEntity> = {
      // where: {
      //     isPublished: true
      // },
      take,
      skip,
      // order: {
      //     createdAt: 'DESC'
      // }
    }

    const resp = await this.userRepository
      .findAndCount(options)
      .catch(err => {
          this.logger.error(err);

          return {users: [], count: 0} as {users: UserAggregate[], count: number};
      });

      return {
        data: resp[0].map(user => {
          const userAgregate = UserAggregate.create(user);
          userAgregate.removePassword();

          return userAgregate;
        }), 
        count: resp[1]
      } as {data: UserAggregate[], count: number};
  }

  async delete(id: string | number): Promise<boolean> {
    return;
  }
}