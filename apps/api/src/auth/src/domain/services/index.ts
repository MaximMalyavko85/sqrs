import { AggregateRoot } from "@nestjs/cqrs";


// for publish and commit
export class SessionService extends AggregateRoot {
  constructor() {
    super();
  }
}