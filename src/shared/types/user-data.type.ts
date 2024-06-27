export enum UserType {
  Pro = 'pro',
  Regular = 'regular'
}

export type UserData = {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  type: UserType;
};
