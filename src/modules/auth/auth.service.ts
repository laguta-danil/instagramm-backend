import { Injectable } from '@nestjs/common';

interface Info {
  expirationDate: Date;
  isConfirmed: boolean;
}

@Injectable()
export class AuthService {
  checkAuthCode(info: Info) {
    if (!info) {
      return false;
    }

    if (info.isConfirmed) {
      return false;
    }

    if (info.expirationDate < new Date()) {
      return false;
    }

    return true;
  }
}
