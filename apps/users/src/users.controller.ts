import { UpdateUserDto } from "./dto";
import { UserResponse } from "./response";
import { UserFacade } from "./services/user.facade";
import { plainToInstance } from "class-transformer";
import { PaginationDto } from "@common/shared/dtos";
import { ERoles, UserAggregate } from "./domain";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAccessGuard, RolesGuard } from "@auth/guards";
import { ApiOkResponsePaginated, ReasponseWithPagination } from "@common/shared/responses";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Put, Query, Req, UseGuards } from "@nestjs/common";


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
  
    const { count, data } = await this.userFacade.queries.getAllUsers(pagination) as any;

    return {
      ...pagination,
      total: count,
      data,
    }
  }

  @ApiTags('USERS')
  @ApiOperation({summary: 'Getting one user'})
  @ApiOkResponse({type: UserResponse, status: HttpStatus.OK})
  @UseGuards(JwtAccessGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneUser(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userFacade.queries.getOneUser(id);
  }

  @ApiTags('USERS')
  @ApiOperation({summary: 'Updating one user'})
  @ApiOkResponse({type: UserResponse, status: HttpStatus.OK})
  @UseGuards(JwtAccessGuard)
  @Put('')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Req() request,
    @Body() updatedUserDto: UpdateUserDto,
  ){
    const { session} = request;
    const { userId } = session;
    return this.userFacade.commands.updateOneUser(userId, updatedUserDto);
  }

  @ApiTags('USERS')
  @ApiOperation({summary: 'Updating one user by admin'})
  @ApiOkResponse({type: UserResponse, status: HttpStatus.OK})
  @UseGuards(JwtAccessGuard, RolesGuard([ERoles.admin]))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserByAdmin(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatedUserDto: UpdateUserDto,
  ){
    return this.userFacade.commands.updateOneUser(userId, updatedUserDto);
  }

  @ApiTags('USERS')
  @ApiOperation({summary: 'Deleting one user'})
  @ApiOkResponse({type: Boolean, status: HttpStatus.NO_CONTENT})
  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneUser(
    @Param('id', ParseIntPipe) userId: number
  ){
    return this.userFacade.commands.deleteUser(userId);
  }
}