import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
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
    const { email } = payload;
    let accessToken = '';
    let refreshToken;
    const isUserExist = await User.isUserExist(email);
    if (isUserExist) {
      throw new ApiError(409, 'User already exist');
    }
    const user = await User.create(payload);
    if (user) {
      const { _id: userId, role, email } = user;
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

  const isUserExist = await User.isUserExist(payloadEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id: userId, role, email } = isUserExist;
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
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
      name: isUserExist.name,
      email: isUserExist.email,
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
