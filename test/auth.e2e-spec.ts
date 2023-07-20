import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { RegisterUrl } from './helper/endpoints';
import { UserFabrica } from './helper/fabrica';
import { myBeforeAll } from './helper/my.before.all';

describe('Auth (e2e)', () => {
  let server: any;

  let userFabrica: UserFabrica;

  beforeAll(async () => {
    const { myServer, prisma } = await myBeforeAll();

    server = myServer;

    userFabrica = new UserFabrica(server, prisma);
  });

  describe('registration', () => {
    it('should be send register email', async () => {
      const [ud0] = userFabrica.createtUserData(1);

      const res = await request(server).post(RegisterUrl).send(ud0);

      expect(res.status).toBe(HttpStatus.NO_CONTENT);
    });
  });
});
