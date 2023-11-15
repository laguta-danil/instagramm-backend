import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User as UserClient } from '@prisma/client';

@ObjectType()
export class User2 implements UserClient {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, {
    nullable: true
  })
  login: string;

  @HideField()
  passwordHash: string;

  @Field(() => String, {
    nullable: true
  })
  photo: string;

  @Field(() => String, {
    nullable: true
  })
  lastName: string;

  @Field(() => String, {
    nullable: true
  })
  city: string;

  @Field(() => String, {
    nullable: true
  })
  aboutMe: string;

  @Field(() => String, {
    nullable: true
  })
  firstName: string;

  @Field(() => String, {
    nullable: true
  })
  birthdayDate: Date;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => String, {
    description: "User's description to the movie",
    nullable: true
  })
  refreshToken: string;

  @Field(() => String)
  role: string;

  @Field(() => Boolean)
  isUserBlocked: boolean;
}
