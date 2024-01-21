/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  role: string;
  address: string;
  phoneNumber: string;
} & Document

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' |'name' | 'role' | 'password' | 'email'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
