import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ISessian } from "../domain/interfaces";
import { Injectable, Logger } from "@nestjs/common";
import { UserSession } from "@common/providers/mongo";
import { SessionAggregate } from "../domain";

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