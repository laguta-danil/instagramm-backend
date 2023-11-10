import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInputCreate {
  @Field(() => String, {
    nullable: false
  })
  name: string;

  @Field(() => String, {
    nullable: true
  })
  firstName?: string;
}

@InputType()
export class UserInputEdit {
  @Field(() => Number)
  id: number;

  @Field(() => String, {
    description: "User's email",
    nullable: false
  })
  email: string;

  @Field(() => String, {
    description: "User's d",
    nullable: true
  })
  refreshToken?: string;
}
