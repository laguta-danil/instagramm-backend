import { faker } from '@faker-js/faker';

interface UserData {
  login: string;
  email: string;
  password: string;
}

export class UserFabrica {
  constructor(private readonly server: any) {}

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
}
