import { PaginationDto } from "@common/shared/dtos";

export class GetUsersQuery {
  constructor( public readonly pagination: PaginationDto){}
}