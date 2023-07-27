import { PartialType } from '@nestjs/swagger';

import { CreateProfilePageDto } from './create-profile-page.dto';

export class UpdateProfilePageDto extends PartialType(CreateProfilePageDto) {}
