import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

export const UserControllers = {
  getUsers: catchAsync(async (req: Request, res: Response) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const result = await userService.getUsers({ page, limit });
    const { total, ...users } = result;
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Users fetched successfully',
      meta: {
        limit,
        page,
        total,
      },
      data: users,
    });
  }),
};
