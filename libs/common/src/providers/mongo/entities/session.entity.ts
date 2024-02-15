import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({
    versionKey: false,
    collection: 'sessions'
})
export class UserSession {
  @Prop()
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  refreshToken: string
}

export const SessionModel = SchemaFactory.createForClass(UserSession);