import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/database/prisma.service';

export const IncorrectUuid = 'a6db59ed-2550-404d-801a-244d3115cf82';

interface UserData {
  login: string;
  email: string;
  password: string;
}

export class UserFabrica {
  constructor(
    private readonly server: any,
    private readonly prisma: PrismaService
  ) {}

  createtUserData(quantity: number): UserData[] {
    const userData: UserData[] = [];

    for (let i = 0; i < quantity; i++) {
      userData.push({
        login: faker.person.firstName(), //`user`,
        email: faker.internet.email(), //`user@email.com`,
        password: faker.internet.password() //`password`,
      });
    }

    return userData;
  }

  async getUsersConfirmEmailByEmail(email: string) {
    return this.prisma.usersConfirmEmail.findFirst({
      select: { confirmCode: true, isConfirmed: true },
      where: { user: { email } }
    });
  }
}
