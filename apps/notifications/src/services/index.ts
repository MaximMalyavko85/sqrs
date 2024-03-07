import { AggregateRoot } from "@nestjs/cqrs";


// for publish and commit
export class NotificationService extends AggregateRoot {
  constructor() {
    super();
  }
}