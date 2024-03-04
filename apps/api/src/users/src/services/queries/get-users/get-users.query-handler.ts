import { Logger } from "@nestjs/common";
import { UserAggregate } from "@users/domain";
import { GetUsersQuery } from "./get-users.query";
import { UserRepository } from "@users/providers";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";


@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery, {data: UserAggregate[], count: number}>{
  private readonly logger = new Logger(GetUsersQueryHandler.name);

  constructor(private readonly userRepository: UserRepository){}

  async execute({pagination}: GetUsersQuery): Promise<{data: UserAggregate[], count: number}> {
    const resivedData = await this.userRepository
      .findAll(pagination)
      .catch(err => {
        this.logger.error(err);

        return [[], 0]
      });

      return {...resivedData} as {data: UserAggregate[], count: number}
  }
}