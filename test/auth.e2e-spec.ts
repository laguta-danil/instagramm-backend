import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

// import request from 'supertest';

// import { HttpStatus } from '@nestjs/common';
// import { ConfirmRegisterUrl, RegisterUrl } from './helper/endpoints';
// import { errorsData } from './helper/errors.data';
// import { IncorrectUuid, UserFabrica } from './helper/fabrica';
// import { myBeforeAll } from './helper/my.before.all';

// describe('Auth (e2e)', () => {
//   let server: any;
//   let userFabrica: UserFabrica;

//   beforeAll(async () => {
//     const { myServer, prisma } = await myBeforeAll();

//     server = myServer;

//     userFabrica = new UserFabrica(server, prisma);
//   });

//   describe('registration', () => {
//     it('should be send register email', async () => {
//       const [ud0] = userFabrica.createtUserData(1);

//       const res = await request(server).post(RegisterUrl).send(ud0);

//       const beforeConfirm = await userFabrica.getUsersConfirmEmailByEmail(
//         ud0.email
//       );

//       const confirmRes = await request(server)
//         .post(ConfirmRegisterUrl)
//         .send({ code: beforeConfirm.confirmCode });

//       const afterConfirm = await userFabrica.getUsersConfirmEmailByEmail(
//         ud0.email
//       );

//       expect(res.status).toBe(HttpStatus.NO_CONTENT);
//       expect(confirmRes.status).toBe(HttpStatus.NO_CONTENT);
//       expect(beforeConfirm.isConfirmed).toBe(false);
//       expect(afterConfirm.isConfirmed).toBe(true);
//     });

//     it("shouldn't register if incorrect code", async () => {
//       const [ud0] = userFabrica.createtUserData(1);

//       const res = await request(server).post(RegisterUrl).send(ud0);

//       const confirmRes = await request(server)
//         .post(ConfirmRegisterUrl)
//         .send({ code: IncorrectUuid });

//       const errors = errorsData('code');

//       expect(res.status).toBe(HttpStatus.NO_CONTENT);
//       expect(confirmRes.status).toBe(HttpStatus.BAD_REQUEST);
//       expect(confirmRes.body).toEqual(errors);
//     });

//     it("shouldn't register user with incorrect data", async () => {
//       const [ud0] = userFabrica.createtUserData(1);

//       const res = await request(server)
//         .post(RegisterUrl)
//         .send({ login: ud0.login });

//       const errors = errorsData('email', 'password');

//       expect(res.status).toBe(HttpStatus.BAD_REQUEST);
//       expect(res.body).toEqual(errors);
//     });
//   });
// });
