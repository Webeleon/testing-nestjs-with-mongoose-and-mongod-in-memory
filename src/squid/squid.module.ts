import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SquidService } from './squid.service';
import { SquidController } from './squid.controller';
import { SquidSchema } from './model/squid.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Squid', schema: SquidSchema },
    ])
  ],
  providers: [SquidService],
  controllers: [SquidController]
})
export class SquidModule {}
