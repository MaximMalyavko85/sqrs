import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserFacade } from "./services/user.facade";
import { plainToInstance } from "class-transformer";
import { PaginationDto } from "@common/shared/dtos";
import { ERoles, UserAggregate } from "./domain";
import { ApiOkResponsePaginated, ReasponseWithPagination } from "@common/shared/responses";
import { UserResponse } from "./response";
import { JwtAccessGuard, RolesGuard } from "@auth/guards";


@Controller('users')
export class UsersController {
  constructor(
      private readonly userFacade   : UserFacade,
  ){} 

  @ApiTags('USERS')
  @ApiOperation({summary: 'Getting all users'})
  @ApiOkResponsePaginated(UserResponse)
  @UseGuards(JwtAccessGuard, RolesGuard([ERoles.admin]))
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() paginatioDto: PaginationDto): Promise<ReasponseWithPagination<UserAggregate>> {
    const pagination = plainToInstance(PaginationDto, paginatioDto);

    // @ts-ignore
    const {count, data} = await this.userFacade.queries.getAllUsers(pagination);

    return {
      ...pagination,
      total: count,
      data,
    }
  }
}