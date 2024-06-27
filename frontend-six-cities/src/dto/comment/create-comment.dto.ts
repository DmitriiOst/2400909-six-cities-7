import CreateUserDto from '../user/create-user.dto';

export default class CreateCommentDto {
  public offerId!: string;
  public text!: string;
  public date!: string;
  public rating!: number;
  public userId!: CreateUserDto;
}
