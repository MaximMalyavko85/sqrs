import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "./get-user.query";
import { UserAggregate } from "@users/domain";
import { UserRepository } from "@users/providers";
import { BadRequestException } from "@nestjs/common";

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

      _userAggregate.removePassword();

    return _userAggregate;
  }
}