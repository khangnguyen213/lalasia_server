import { db } from '../utils/db.server';

export const orderDetailModel = {
  async sessionToOrderDetail(
    userId: string,
    sessionId: string,
    addressId?: string
  ) {
    try {
      let userAddress: {
        id: string;
        userId: string;
        recipient_name: string;
        recipient_phone: string;
        city: string;
        district: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
      } | null;

      if (!addressId) {
        userAddress = await db.user_Address.findFirst({
          where: { userId: userId },
        });
      } else {
        userAddress = await db.user_Address.findFirst({
          where: { userId: userId },
        });
      }

      if (!userAddress) {
        throw new Error('Địa chỉ không tồn tại');
      }

      const session_detail = await db.shopping_Session.findUnique({
        where: { id: sessionId },
      });

      if (!session_detail) {
        throw new Error('Đơn hàng không tồn tại');
      }

      const order_detail = await db.order_Detail.create({
        data: {
          user_id: userId,
          address_id: userAddress.id,
          total: session_detail.total,
        },
      });

      const session_items = await db.session_Item.findMany({
        where: { session_id: sessionId },
        select: {
          quantity: true,
          product_id: true,
        },
      });

      await db.order_Item.createMany({
        data: session_items.map((item) => ({
          order_detail_id: order_detail.id,
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      });

      return order_detail;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  async getOrderDetailByUserId(userId: string) {
    try {
      const order_detail = await db.order_Detail.findMany({
        where: { user_id: userId },
        include: {
          order_items: {
            include: {
              product: true,
            },
          },
        },
      });

      return order_detail;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
