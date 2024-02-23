import { SessionAggregate } from "../domain";
import { ISessian } from "../domain/interfaces";

export abstract class SessionRepository {
  abstract save(user: ISessian): Promise<SessionAggregate>
  abstract findOne(options: string | number ): Promise<SessionAggregate>
  abstract findOneWhere(where): Promise<SessionAggregate>
  abstract delete(id: number): Promise<boolean>
}