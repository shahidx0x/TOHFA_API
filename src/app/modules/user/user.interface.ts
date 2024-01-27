/* eslint-disable no-unused-vars */

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  address: string;
  phoneNumber: string;
};

export type IsUserExist = (
  email: string
) => Promise<
  Pick<IUser, 'id' | 'name' | 'role' | 'password' | 'email' | 'image'>
> | null;

export type IsPasswordMatched = (
  givenPassword: string,
  savedPassword: string
) => Promise<boolean>;
