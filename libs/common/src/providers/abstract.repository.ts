import { Logger } from "@nestjs/common";
import { AbstractSchema } from "./abstract.schema";
import { Model } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(private readonly repository: Model<TDocument>) {}
}