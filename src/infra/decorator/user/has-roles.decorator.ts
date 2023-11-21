import { SetMetadata } from '@nestjs/common';

import { Role } from '../../../modules/user/dto/role.enum';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
