import { UserTypeDto } from './user-type.dto';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarUrl!: string;
  public type!: UserTypeDto;
}
