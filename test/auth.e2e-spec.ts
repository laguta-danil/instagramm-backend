import bcrypt from 'bcrypt';
import request from 'supertest';

import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../src/database/prisma.service';
import { deleteAllData } from './helper/delete.all.data';
import {
  ConfirmRegisterUrl,
  EmailResendingUrl,
  NewPasswordUrl,
  PasswordRecoveryUrl,
  RegisterUrl
} from './helper/endpoints';
import { errorsData } from './helper/errors.data';
import { IncorrectUuid, UserFabrica } from './helper/fabrica';
import { myBeforeAll } from './helper/my.before.all';

describe('Auth (e2e)', () => {
  let server: any;
  let userFabrica: UserFabrica;
  let prisma: PrismaService;

  beforeAll(async () => {
    const { myServer, prismaService } = await myBeforeAll();

    server = myServer;
    prisma = prismaService;

    userFabrica = new UserFabrica(server, prismaService);
  });

  beforeEach(async () => {
    await deleteAllData(prisma);
  });

  describe('registration', () => {
    it('should be send register email', async () => {
      const [ud0] = userFabrica.createUserData(1);

      const res = await request(server).post(RegisterUrl).send(ud0);

      const beforeConfirm = await userFabrica.getUsersConfirmEmailByEmail(
        ud0.email
      );

      console.log('TEST', beforeConfirm);

      const confirmRes = await request(server)
        .post(ConfirmRegisterUrl)
        .send({ code: beforeConfirm.confirmCode });

      const afterConfirm = await userFabrica.getUsersConfirmEmailByEmail(
        ud0.email
      );

      expect(res.status).toBe(HttpStatus.NO_CONTENT);
      expect(confirmRes.status).toBe(HttpStatus.NO_CONTENT);
      expect(beforeConfirm.isConfirmed).toBe(false);
      expect(afterConfirm.isConfirmed).toBe(true);
    });

    it("shouldn't register if incorrect code", async () => {
      const [ud0] = userFabrica.createUserData(1);

      const res = await request(server).post(RegisterUrl).send(ud0);

      const confirmRes = await request(server)
        .post(ConfirmRegisterUrl)
        .send({ code: IncorrectUuid });

      const errors = errorsData('code');

      expect(res.status).toBe(HttpStatus.NO_CONTENT);
      expect(confirmRes.status).toBe(HttpStatus.BAD_REQUEST);
      expect(confirmRes.body).toEqual(errors);
    });

    it("shouldn't register user with incorrect data", async () => {
      const [ud0] = userFabrica.createUserData(1);

      const res = await request(server)
        .post(RegisterUrl)
        .send({ login: ud0.login });

      const errors = errorsData('password', 'email');

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toEqual(errors);
    });
  });

  describe('email resending', () => {
    it('should be email resending', async () => {
      const [ud0] = userFabrica.createUserData(1);

      await request(server).post(RegisterUrl).send(ud0);

      const res = await request(server)
        .post(EmailResendingUrl)
        .send({ email: ud0.email });

      const beforeConfirm = await userFabrica.getUsersConfirmEmailByEmail(
        ud0.email
      );

      const confirmRes = await request(server)
        .post(ConfirmRegisterUrl)
        .send({ code: beforeConfirm.confirmCode });

      const afterConfirm = await userFabrica.getUsersConfirmEmailByEmail(
        ud0.email
      );

      expect(res.status).toBe(HttpStatus.NO_CONTENT);
      expect(confirmRes.status).toBe(HttpStatus.NO_CONTENT);
      expect(beforeConfirm.isConfirmed).toBe(false);
      expect(afterConfirm.isConfirmed).toBe(true);
    });

    it("should't email resending if incorrect email", async () => {
      const [ud0, ud1] = userFabrica.createUserData(2);

      await request(server).post(RegisterUrl).send(ud0);

      const res = await request(server)
        .post(EmailResendingUrl)
        .send({ email: ud1.email });

      const errors = errorsData('email');

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toEqual(errors);
    });
  });

  describe('password recovery', () => {
    it('should be password recovery', async () => {
      const [ud0] = userFabrica.createUserData(1);

      await request(server).post(RegisterUrl).send(ud0);

      const res = await request(server)
        .post(PasswordRecoveryUrl)
        .send(ud0.email);

      const { recoveryCode } = await userFabrica.getRecoveryCodeByEmail(
        ud0.email
      );

      const beforeRecovery = await userFabrica.getUserByEmail(ud0.email);

      const newPassword = 'newPass123';

      const passRes = await request(server)
        .post(NewPasswordUrl)
        .send({ newPassword, recoveryCode });

      const afterRecovery = await userFabrica.getUserByEmail(ud0.email);

      const isSuccessRecovery = await bcrypt.compare(
        newPassword,
        afterRecovery.passwordHash
      );

      expect(res.status).toBe(HttpStatus.NO_CONTENT);
      expect(passRes.status).toBe(HttpStatus.NO_CONTENT);
      expect(beforeRecovery.passwordHash).not.toEqual(
        afterRecovery.passwordHash
      );
      expect(isSuccessRecovery).toBe(true);
    });

    it("shouldn't password recovery if user email no register", async () => {
      const [ud0] = userFabrica.createUserData(1);

      const res = await request(server)
        .post(PasswordRecoveryUrl)
        .send(ud0.email);

      const { recoveryCode } = await userFabrica.getRecoveryCodeByEmail(
        ud0.email
      );

      expect(res.status).toBe(HttpStatus.NO_CONTENT);
      expect(recoveryCode).toBeNull();
    });
  });
});
