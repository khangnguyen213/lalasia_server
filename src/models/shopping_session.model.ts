import { db } from '../utils/db.server';
import { Prisma } from '@prisma/client';

type ShoppingSession = {
  id: string;
  user_id: string;
  total: Prisma.Decimal;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  session_items: {
    id: string;
    session_id: string;
    product_id: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];
};

type SessionItem = {
  id: string;
  session_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: Prisma.Decimal;
    image: string;
    description: string;
    category_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

//select * from session_item
//inner join product
//on session_item.product_id = product.id
//where session_item.session_id = '1'
export const shoppingSessionModel = {
  async addOrUpdateItemToShoppingSession(
    shoppingSessionId: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    try {
      const sessionItem = await db.session_Item.findFirst({
        where: {
          session_id: shoppingSessionId,
          product_id: productId,
        },
      });
      if (sessionItem) {
        const updatedItem = await db.session_Item.update({
          where: {
            id: sessionItem.id,
          },
          data: {
            quantity: sessionItem.quantity + +quantity,
          },
        });
        if (updatedItem.quantity <= 0) {
          await db.session_Item.delete({
            where: {
              id: sessionItem.id,
            },
          });
        }
      } else {
        await db.session_Item.create({
          data: {
            session_id: shoppingSessionId,
            product_id: productId,
            quantity: +quantity,
          },
        });
      }

      const total: { total: Prisma.Decimal }[] =
        await db.$queryRaw`SELECT sum(Product.price * Session_Item.quantity) as total FROM Session_Item
      INNER JOIN Product
      ON Session_Item.product_id = Product.id
      WHERE Session_Item.session_id = ${shoppingSessionId}`;

      // const sessionItems = await db.session_Item.findMany({
      //   where: {
      //     session_id: shoppingSessionId,
      //   },
      //   select: {
      //     quantity: true,
      //     product: {
      //       select: {
      //         price: true,
      //       },
      //     },
      //   },
      // });

      // const total = sessionItems.reduce((acc, item) => {
      //   return acc + +item.quantity * +item.product.price;
      // }, 0);
      // console.log(total);

      await db.shopping_Session.update({
        where: {
          id: shoppingSessionId,
        },
        data: {
          total: total[0].total,
          // total: total,
        },
      });
    } catch (error) {
      throw new Error('Lỗi thêm sản phẩm vào giỏ hàng');
    }
  },
  async getShoppingSession(
    shoppingSessionId: string
  ): Promise<ShoppingSession | null> {
    try {
      const shoppingSession = await db.shopping_Session.findUnique({
        where: {
          id: shoppingSessionId,
        },
        include: {
          session_items: {
            include: {
              product: true,
            },
          },
        },
      });
      return shoppingSession;
    } catch (error) {
      throw new Error('Lỗi lấy giỏ hàng');
    }
  },
  async deleteSessionItem(sessionItemId: string): Promise<void> {
    try {
      await db.session_Item.delete({
        where: {
          id: sessionItemId,
        },
      });
    } catch (error) {
      throw new Error('Lỗi xóa sản phẩm khỏi giỏ hàng');
    }
  },
  async deleteShoppingSession(shoppingSessionId: string): Promise<void> {
    try {
      await db.shopping_Session.update({
        where: {
          id: shoppingSessionId,
        },
        data: {
          session_items: {
            deleteMany: {},
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Lỗi xóa giỏ hàng');
    }
  },
};
