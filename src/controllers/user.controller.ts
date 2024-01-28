import { userModel } from '../models/user.model';
import { Request, Response } from 'express';

type Session_Data_User = {
  id: string;
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  shopping_session: {
    id: string;
  }[];
};
declare module 'express-session' {
  interface SessionData {
    user: Session_Data_User;
  }
}

export const userController = {
  listUser: async (req: Request, res: Response) => {
    try {
      const users = await userModel.listUsers();
      res.status(200).json({
        message: 'Lấy danh sách user thành công',
        data: users,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'Không tìm thấy user' });
      } else {
        res.status(200).json({
          message: 'Lấy user thành công',
          data: user,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userModel.createUser(req.body);
      res.status(200).json({
        message: 'Tạo user thành công',
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await userModel.updateUser(req.params.id, req.body);
      res.status(200).json({
        message: 'Cập nhật user thành công',
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await userModel.deleteUser(req.params.id);
      res.status(200).json({
        message: 'Xóa user thành công',
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const user = await userModel.login(req.body.email, req.body.password);

      req.session.user = user;
      res.status(200).json({
        message: 'Đăng nhập thành công',
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: 'Đăng xuất thành công',
          });
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
