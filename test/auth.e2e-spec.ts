import request from 'supertest';

import { HttpStatus } from '@nestjs/common';
import { ConfirmRegisterUrl, RegisterUrl } from './helper/endpoints';
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

      const beforeConfirm = await userFabrica.getUsersConfirmEmailByEmail(
        ud0.email
      );

      const confirmRes = await request(server)
        .post(ConfirmRegisterUrl)
        .send({ code: beforeConfirm.confirmCode });

      const afterConfirm = await userFabrica.getUsersConfirmEmailByEmail(
        ud0.email
      );

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(confirmRes.status).toBe(HttpStatus.NOT_FOUND);
      expect(beforeConfirm.isConfirmed).toBe(false);
      expect(afterConfirm.isConfirmed).toBe(true);
    });
  });
});
