export class CreateProfilePageDto {
  userId: string;
  photo?: string;
  firstName?: string;
  lastName?: string;
  birthdayDate?: Date;
  city?: string;
  aboutMe?: string;
}
