import { IUser, UserAggregate } from "../domain";

export abstract class UserRepository {
  abstract save(user: IUser): Promise<UserAggregate>
  abstract findOne(options: string | number ): Promise<UserAggregate>
  abstract findAll(pagination: any): Promise<[UserAggregate[], number]>
  abstract findOneWhere(where): Promise<UserAggregate>
  abstract delete(id: string | number): Promise<boolean>
}