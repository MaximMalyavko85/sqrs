import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { IUser, UserAggregate } from "../domain";
import { FindManyOptions, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/common/providers/typeorm";

// Adapter - this is API for this microservice
//If nessesary change thomething, we can create new adapter and will include to module

@Injectable()
export class UserAdapter implements UserRepository {
  private readonly logger = new Logger(UserAdapter.name);

  constructor(
    //@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async save(user: IUser): Promise<any> {

    console.log("asdasdasdas", user)

    //return UserAggregate.create();
  }

  async findOne(id: string | number): Promise<any> {

    //return UserAggregate.create();
  }

  async findAll(pagination: any):Promise <any> { // Promise<[UserAggregate[], number]

    // return [
    //   [].map(user => UserAggregate.create(user)),
    //   0,
    // ]
  }

  async delete(id: string | number): Promise<boolean> {
    return;
  }
}