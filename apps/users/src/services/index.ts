import { AggregateRoot } from "@nestjs/cqrs";


// for publish and commit
export class UserService extends AggregateRoot {
  constructor() {
    super();
  }
}