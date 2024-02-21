import { UpdateUserDto } from "@users/dto";
import { IUser, UserAggregate } from "../domain";

export abstract class UserRepository {
  abstract save(user: IUser): Promise<UserAggregate> // IUser??? dto
  abstract findOne(options: string | number ): Promise<UserAggregate>
  abstract findAll(pagination: any): Promise<{data: UserAggregate[], count: number}>
  abstract findOneWhere(where): Promise<UserAggregate>
  abstract delete(id: string | number): Promise<boolean>
  abstract updateUser(userId: number, updatedUser: UpdateUserDto): Promise<UserAggregate>
}