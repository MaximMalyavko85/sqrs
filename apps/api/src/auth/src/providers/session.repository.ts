import { SessionAggregate } from "../domain/session.aggregate";
import { ISessian } from "../domain/session.interface";

export abstract class SessionRepository {
  abstract save(user: ISessian): Promise<SessionAggregate>
  abstract findOne(options: string | number ): Promise<SessionAggregate>
  abstract findOneWhere(where): Promise<SessionAggregate>
  abstract delete(id: string | number): Promise<boolean>
}