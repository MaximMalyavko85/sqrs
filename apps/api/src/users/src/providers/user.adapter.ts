import { UpdateUserDto } from "@users/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { FindManyOptions, Repository } from "typeorm";
import { UserEntity } from "@common/providers/typeorm";
import { IUser, UserAggregate } from "../domain";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PaginationDto } from "@common/shared/dtos";

// Adapter - this is API for this microservice
//If nessesary change thomething, we can create new adapter and will include to module

@Injectable()
export class UserAdapter implements UserRepository {
  private readonly logger = new Logger(UserAdapter.name);

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async save(newUser: IUser): Promise<UserAggregate> {
    const createdUser =  await this.userRepository.save(newUser);

    return UserAggregate.create(createdUser);
  }

  async findOne(id: string | number): Promise<any> {}

  async findOneWhere(where: object): Promise<UserAggregate> {
    const user = await this.userRepository.findOne({ where}) as IUser;
    
    if (!user) return;

    return UserAggregate.create(user);
  }

  async findAll(pagination: PaginationDto): Promise <{data: UserAggregate[], count: number}> {
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

  async updateUser(userId: number, updatedUserDto: UpdateUserDto): Promise<UserAggregate> {
    const existedUser = await this.findOneWhere({ id:userId });

    if (!existedUser) {
      throw new BadRequestException("User with this Id isn't exist");
    }
  
    const userWithMappedNotReadbleProperty = {
      ...updatedUserDto, 
      role: existedUser.role,
      email: existedUser.email,
      password: existedUser.password,
    }

    await this.userRepository.update(userId, userWithMappedNotReadbleProperty);

    return UserAggregate.create({...userWithMappedNotReadbleProperty, id: userId});
  }

  async deleteOneWhere(where: object): Promise<boolean> {
    const result = await this.userRepository
      .delete(where)
        .catch(err => {
            this.logger.error(err);
        });

    return !!result;
  }
}