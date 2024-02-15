import { Injectable, Logger } from "@nestjs/common";
import { ISessian } from "../domain/session.interface";
import { UserSession } from "@common/providers/mongo/entities/session.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SessionAdapter {
  private readonly logger = new Logger(SessionAdapter.name);

  constructor(
    @InjectModel(UserSession.name) private sessionModel: Model<UserSession>
  ) {}

  async save(newSession: ISessian): Promise<any> {
    const createdSesion =  await this.sessionModel.create(newSession);

    console.log(createdSesion)

    // return SessionAggregate.create(createdSesion);
  }

  async findOne(id: string | number): Promise<any> {

    //return UserAggregate.create();
  }

  async findOneWhere(where: object): Promise<any> {
    // const user = await this.userRepository.findOne({ where}) as IUser;
    
    // if (!user) return;

    // return UserAggregate.create(user);
  }

  async delete(id: string | number): Promise<boolean> {
    return;
  }
}