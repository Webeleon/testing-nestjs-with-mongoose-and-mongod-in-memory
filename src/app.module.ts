import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tesing-with-in-memory-mongoose')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
