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

  async findOne(id: string | number): Promise<any> {}

  async findOneWhere(where: object): Promise<SessionAggregate> {
    const session = await this.sessionModel.findOne(where);

    if (!session) return;

    return SessionAggregate.create(session);
  }

  async delete(userId:number): Promise<boolean> {
    const deletedSession =  await this.sessionModel.deleteMany({userId: 2});
    return !!deletedSession.deletedCount;
  }
}