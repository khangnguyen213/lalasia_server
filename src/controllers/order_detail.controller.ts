import { orderDetailModel } from '../models/order_detail.model';
import { shoppingSessionModel } from '../models/shopping_session.model';
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

export const orderDetailController = {
  async addOrderDetail(req: Request, res: Response) {
    try {
      const { addressId } = req.body;

      if (!req.session.user) {
        throw new Error('Bạn chưa đăng nhập');
      }
      const userId = req.session.user.id;
      const sessionId = req.session.user.shopping_session[0].id;

      const orderDetail = await orderDetailModel.sessionToOrderDetail(
        userId,
        sessionId,
        addressId
      );

      await shoppingSessionModel.deleteShoppingSession(sessionId);

      res.status(200).json({
        message: 'Đặt hàng thành công',
        data: orderDetail,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  async getOrderDetail(req: Request, res: Response) {
    try {
      if (!req.session.user) {
        throw new Error('Bạn chưa đăng nhập');
      }
      const userId = req.session.user.id;
      const orderDetail = await orderDetailModel.getOrderDetailByUserId(userId);
      res.status(200).json({
        message: 'Lấy đơn hàng thành công',
        data: orderDetail,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
