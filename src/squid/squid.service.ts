import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Squid } from './model/squid.schema';


@Injectable()
export class SquidService {
  constructor(
    @InjectModel('Squid') private squidModel: Model<Squid>,
  ) {
    this.fixtures()
      .then(() => Logger.log('fixtures OK', 'SquidService'));
  }

  async createSquid(url: string): Promise<Squid> {
    return this.squidModel.create({ url });
  }


  async getSquid(): Promise<Squid> {
    const count = await this.squidModel.countDocuments().exec();
    const randomIndex = Math.abs(Math.round(Math.random() * count));
    return this.squidModel.findOne().skip(randomIndex).exec();
  }

  async fixtures(): Promise<void> {
    const count = await this.squidModel.countDocuments().exec();
    const squidGifsURLs = [
      'https://media.giphy.com/media/xpNqS4fGFjkGc/giphy.gif',
      'https://media.giphy.com/media/xba8H2kwJb06k/giphy.gif',
      'https://media.giphy.com/media/3oTBHcLxPejug/giphy.gif',
    ];
    if (count === 0) {
      for (const url of squidGifsURLs) {
        await this.createSquid(url);
      }
    }
  }
}
