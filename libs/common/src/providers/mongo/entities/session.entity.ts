import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    versionKey: false,
    collection: 'sessions'
})
export class UserSession {
  @Prop()
  _id: string;

  @Prop()
  userId: number;

  @Prop()
  refreshToken: string
}

export const SessionModel = SchemaFactory.createForClass(UserSession);