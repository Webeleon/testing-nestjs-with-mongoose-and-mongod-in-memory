Assuming you already installed and configured mongoose in your NestJS project.

For the sake of having something to test we will create a Squid API. The API will provide a random squid gif when called.
You can see the actual implementation in the [demo repo](https://github.com/Webeleon/testing-nestjs-with-mongoose-and-mongod-in-memory).

Writing tests for code that interact with databases is rather painful.

You either have to create test databases and delete them afterward.
OR 
You end up writing and debugging a ton of code to clean before after the testing...

Today is the end of your misery!
I am here to save you the trouble of testing. *with nestJS, mongoose and MongoDB.... sorry for the others*

First, we will need to add a new development package to the project. (link to the Github repository provided at the end of this article)
```
npm i --save-dev mongodb-memory-server 
```

Cool, We can now spawn mongo daemon in memory! How awesome is that? 
Since I am a lazy brat, I do not want to rewrite the in-memory mongod bootstrapping code.
Let's write a small test utils file that will provide us an easy to import preconfigured root MongooseModule and an helper to close the connection.
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
Excellent, in-memory plug an play MongoDB daemon!
Let's import that bad boy to our service and controller test.
Don't forget to close the connection in the `afterAll` function.

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
  
  /**
    Write meaningful test
  **/

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
```

And voila! 
You are all set.
Go back to testing the wonderful code you are writing!

Next Time we will handle the case of end to end test for NestJS.

## Sources
[NestjJS](https://nestjs.com/)
[NestJS techniques mongodb](https://docs.nestjs.com/techniques/mongodb)
[mongod-in-memory](https://github.com/nodkz/mongodb-memory-server)
[The issue that saved me](https://github.com/nestjs/mongoose/issues/167)
