import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { isUserExist } from '../../../helpers/isUserExist';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { passwordHaser } from '../../../helpers/passwordHasher';
import { passwordMatcher } from '../../../helpers/passwordMatcher';
import prisma from '../../../server';
import {
  ICreateUser,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const createUser = async (
  payload: ICreateUser
): Promise<ILoginUserResponse> => {
  try {
    const { email, password } = payload;
    let accessToken = '';
    let refreshToken;
    const isExist = await isUserExist(email);
    if (isExist) {
      throw new ApiError(409, 'User already exist');
    }
    const passwordHash = await passwordHaser(password);
    payload.password = passwordHash;
    const user = await prisma.user.create({ data: payload });
    const name = user.name;
    const image = user.image;
    if (user) {
      const { id: userId, role, email } = user;
      accessToken = jwtHelpers.createToken(
        { userId, role, email },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      );

      refreshToken = jwtHelpers.createToken(
        { userId, role, email },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );
    } else {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'User Registration Failed'
      );
    }
    return {
      name,
      image,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    if ((error as ApiError).statusCode === 409) {
      throw new ApiError(
        (error as ApiError).statusCode,
        (error as ApiError).message
      );
    } else {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
  }
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email: payloadEmail, password } = payload;

  const isExist = await isUserExist(payloadEmail);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isExist.password &&
    !(await passwordMatcher(password, isExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role, email } = isExist;
  const name = isExist.name;
  const image = isExist.image;
  const accessToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    name,
    image,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;
  const isExist = await isUserExist(email);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isExist.id,
      role: isExist.role,
      name: isExist.name,
      email: isExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
