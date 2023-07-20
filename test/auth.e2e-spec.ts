import request from 'supertest';
import { RegisterUrl } from './helper/endpoints';
import { UserFabrica } from './helper/fabrica';
import { myBeforeAll } from './helper/my.before.all';

describe('Auth (e2e)', () => {
  let server: any;

  let userFabrica: UserFabrica;

  beforeAll(async () => {
    const { myServer } = await myBeforeAll();

    server = myServer;

    userFabrica = new UserFabrica(server);
  });

  describe('registration', () => {
    it('should be send register email', async () => {
      const res = await request(server).post(RegisterUrl);
    });
  });
});
