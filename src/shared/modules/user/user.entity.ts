import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { UserData, UserType } from '../../types/user-data.type.js';
import { createSHA256 } from '../../helpers/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements UserData {
  @prop({required: true, default: ''})
  public name: string;

  @prop({unique: true, required: true})
  public email: string;

  @prop({unique: true, required: false, default: ''})
  public avatarUrl: string;

  @prop({required: true, default: ''})
  public password: string;

  @prop({required: true})
  public type: UserType;

  constructor(userData: UserData) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.password = userData.password;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
