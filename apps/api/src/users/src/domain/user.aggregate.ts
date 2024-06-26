import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, ValidateIf, validateSync } from "class-validator";
import { DomainError } from "@common/errors";
import { IUser } from "./interfaces/user.interface";
import { ERoles } from "./roles.enum";
import { EGender } from "./gender.enum";
import { UserService } from "../services";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { Escape } from "class-sanitizer";
import * as bcrypt from 'bcrypt';

export class UserAggregate extends UserService implements IUser {
  id?: number | null;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Escape()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Escape()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Escape()
  lastName: string;

  @ValidateIf(o => 'password' in o)
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 60) //32 -> 60
  @Escape()
  password: string;

  @ValidateIf(o => 'userName' in o)
  @IsString()
  @IsNotEmpty()
  @Escape()
  userName: string;

  @IsNotEmpty()
  @IsEnum(ERoles)
  role: ERoles = ERoles.user;

  @IsNotEmpty()
  @IsEnum(EGender)
  gender: EGender;

  private constructor() {
    super();
  }

  static create(credsDto: CreateUserDto | UpdateUserDto){
    const _user = new UserAggregate();

    Object.assign(_user, credsDto);
    
    if (!_user.userName) {
      _user.createUserName();
    }

    const errors = validateSync(_user);
    if (!!errors.length) throw new DomainError(errors, 'User not valid.');

    return _user;
  }

  private createUserName() {
    this.userName = this.email;
  }

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); //10-solt
  }

  public async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  public removePassword(){
    delete this['password'];
  }
}