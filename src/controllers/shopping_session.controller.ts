import { Response, Request } from 'express';
import { shoppingSessionModel } from '../models/shopping_session.model';

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

export const shoppingSessionController = {
  async addOrUpdateItemToShoppingSession(req: Request, res: Response) {
    try {
      if (!req.session.user) {
        throw new Error('Bạn chưa đăng nhập');
      }
      const { productId, quantity } = req.body;
      const shoppingSessionId = req.session.user.shopping_session[0].id;
      await shoppingSessionModel.addOrUpdateItemToShoppingSession(
        shoppingSessionId,
        productId,
        quantity
      );
      res.status(200).json({
        success: true,
        message: 'Cập nhật giỏ hàng thành công',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Lỗi cập nhật giỏ hàng',
      });
    }
  },

  async getShoppingSession(req: Request, res: Response) {
    try {
      if (!req.session.user) {
        throw new Error('Bạn chưa đăng nhập');
      }
      const shoppingSessionId = req.session.user.shopping_session[0].id;
      const shoppingSession = await shoppingSessionModel.getShoppingSession(
        shoppingSessionId
      );
      res.status(200).json({
        success: true,
        data: shoppingSession,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Lỗi lấy giỏ hàng',
      });
    }
  },

  async deleteSessionItem(req: Request, res: Response) {
    try {
      const { sessionItemId } = req.params;
      await shoppingSessionModel.deleteSessionItem(sessionItemId);
      res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm thành công',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Lỗi xóa sản phẩm',
      });
    }
  },

  async deleteShoppingSession(req: Request, res: Response) {
    try {
      if (!req.session.user) {
        throw new Error('Bạn chưa đăng nhập');
      }
      const shoppingSessionId = req.session.user.shopping_session[0].id;
      await shoppingSessionModel.deleteShoppingSession(shoppingSessionId);
      res.status(200).json({
        success: true,
        message: 'Xóa giỏ hàng thành công',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Lỗi xóa giỏ hàng',
      });
    }
  },
};
