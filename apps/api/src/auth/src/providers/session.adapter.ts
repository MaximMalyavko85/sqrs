import { Injectable, Logger } from "@nestjs/common";
import { ISessian } from "../domain/interfaces";
import { UserSession } from "@common/providers/mongo/entities/session.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SessionAggregate } from "@auth/domain/session.aggregate";

@Injectable()
export class SessionAdapter {
  private readonly logger = new Logger(SessionAdapter.name);

  constructor(
    @InjectModel(UserSession.name) private sessionModel: Model<UserSession>
  ) {}

  async save(newSession: ISessian): Promise<SessionAggregate> {
    const updatedSesion =  await this.sessionModel.findOneAndReplace(
      {userId: newSession.userId},
      {userId: newSession.userId, refreshToken: newSession.refreshToken}
    );

    if (!updatedSesion) {
      await this.sessionModel.create(newSession);
    }
    
    return newSession;
  }

  async findOne(id: string | number): Promise<any> {

    //return UserAggregate.create();
  }

  async findOneWhere(where: object): Promise<any> {
    // const user = await this.userRepository.findOne({ where}) as IUser;
    
    // if (!user) return;

    // return UserAggregate.create(user);
  }

  async delete(userId:number): Promise<boolean> {
    const deletedSession =  await this.sessionModel.deleteMany({userId: 2});
    return !!deletedSession.deletedCount;
  }
}