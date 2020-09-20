import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SquidModule } from './squid/squid.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tesing-with-in-memory-mongoose'),
    SquidModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
