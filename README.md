Assuming you already installed and configured mongoose in your NestJS project.

For the sake of having something to test we will create a Squid API. The api will provide a random squid gif when called.
You can see the actual implementation in the [demo repo](https://github.com/Webeleon/testing-nestjs-with-mongoose-and-mongod-in-memory).

```shell script
npm i --save-dev mongodb-memory-server 
```

```ts
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) => MongooseModule.forRootAsync({
  useFactory: async () => {
    mongod = new MongoMemoryServer();
    const mongoUri = await mongod.getUri();
    return {
      uri: mongoUri,
      ...options,
    }
  },
});

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
}
```

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { SquidService } from './squid.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../test-utils/mongo/MongooseTestModule';
import { SquidSchema } from './model/squid.schema';

describe('SquidService', () => {
  let service: SquidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Squid', schema: SquidSchema }]),
      ],
      providers: [SquidService],
    }).compile();

    service = module.get<SquidService>(SquidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
```

## Bibliography
[NestjJS](https://nestjs.com/)
[NestJS techniques mongodb](https://docs.nestjs.com/techniques/mongodb)
[The issue that saved me](https://github.com/nestjs/mongoose/issues/167)
