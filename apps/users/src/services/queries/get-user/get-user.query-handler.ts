import { UserAggregate } from "@users/domain";
import { GetUserQuery } from "./get-user.query";
import { UserRepository } from "@users/providers";
import { BadRequestException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery, UserAggregate> {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute({ userId }: GetUserQuery): Promise<UserAggregate> {
    const _userAggregate = await this.userRepository
      .findOneWhere({id: userId})
      .catch(err => {
        throw new BadRequestException(err);
      });

      if (!_userAggregate) {
        throw new BadRequestException("User with this Id isn't exist");
      }

      _userAggregate.removePassword();

    return _userAggregate;
  }
}