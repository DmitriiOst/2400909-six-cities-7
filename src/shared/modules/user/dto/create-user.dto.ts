import { IsString, IsEmail, Length, IsBoolean } from 'class-validator';

import { CreateUserMessages } from './create-user.messages.js';
import { UserType } from '../../../types/user-data.type.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;

  @IsBoolean()
  public type: UserType;
}
