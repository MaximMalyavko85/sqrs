import { CreateUserDto, UpdateUserDto } from "@users/dto";
import { UserAggregate } from "../domain";
import { PaginationDto } from "@common/shared/dtos";

export abstract class UserRepository {
  abstract save(user: CreateUserDto): Promise<UserAggregate>
  abstract findOne(options: string | number ): Promise<UserAggregate>
  abstract findAll(pagination: PaginationDto): Promise<{data: UserAggregate[], count: number}>
  abstract findOneWhere(where: object): Promise<UserAggregate>
  abstract deleteOneWhere(where: object | number): Promise<boolean>
  abstract updateUser(userId: number, updatedUser: UpdateUserDto): Promise<UserAggregate>
}