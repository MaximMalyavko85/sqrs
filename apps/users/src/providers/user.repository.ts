import { IUser, UserAggregate } from "../domain";

export abstract class UserRepository {
  abstract save(user: IUser): Promise<UserAggregate>
  abstract findOne(id: string | number): Promise<UserAggregate>
  abstract findAll(pagination: any): Promise<[UserAggregate[], number]>
  abstract delete(id: string | number): Promise<boolean>
}