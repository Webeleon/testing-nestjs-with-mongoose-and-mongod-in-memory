import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Squid extends Document {
  constructor(url: string) {
    super();
    this.url = url;
  }
  @Prop()
  url: string;
}

export const SquidSchema = SchemaFactory.createForClass(Squid);

