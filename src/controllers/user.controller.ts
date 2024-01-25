import { userModel } from '../models/user.model';
import { Request, Response } from 'express';

export const userController = {
  listUser: async (req: Request, res: Response) => {
    try {
      const users = await userModel.listUsers();
      res.send(users);
    } catch (error) {
      res.sendStatus(500);
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userModel.createUser(req.body);
      res.send(user);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};
