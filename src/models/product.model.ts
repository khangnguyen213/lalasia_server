import { db } from '../utils/db.server';
import { Prisma } from '@prisma/client';

type Product = {
  id: string;
  name: string;
  desc: string;
  price: Prisma.Decimal;
  quantity: number;
  discount_id: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

type ProductCreate = {
  name: string;
  desc: string;
  price: string;
  quantity: number;
};

export const productModel = {
  async getAll(
    keyword?: string,
    nPerPageQuery?: string,
    pageQuery?: string,
    sortName?: string,
    sortPrice?: string,
    sortCreatedAt?: string
  ): Promise<{ products: Product[]; total: number; totalPage: number }> {
    const nPerPage = nPerPageQuery ? +nPerPageQuery : 10;
    const page = pageQuery ? +pageQuery : 1;
    const orderBy: { [key: string]: 'asc' | 'desc' }[] = [];
    if (sortName) {
      orderBy.push({
        name: sortName as 'asc' | 'desc',
      });
    }
    if (sortPrice) {
      orderBy.push({
        price: sortPrice as 'asc' | 'desc',
      });
    }
    if (sortCreatedAt) {
      orderBy.push({
        createdAt: sortCreatedAt as 'asc' | 'desc',
      });
    }

    console.log(orderBy);

    try {
      const total = await db.product.count({
        where: {
          deletedAt: null,
          name: {
            contains: keyword,
          },
        },
        orderBy: orderBy,
      });
      const products = await db.product.findMany({
        where: {
          deletedAt: null,
          name: {
            contains: keyword,
          },
        },
        include: {
          categories: {
            where: {
              deletedAt: null,
            },
          },
          discount: {
            where: {
              AND: [
                {
                  deletedAt: null,
                },
                {
                  active: true,
                },
              ],
            },
          },
          images: {
            where: {
              deletedAt: null,
            },
          },
        },
        take: nPerPage,
        skip: (page - 1) * nPerPage,
        orderBy: orderBy,
      });
      return {
        products,
        total,
        totalPage: Math.ceil(total / nPerPage),
      };
    } catch (error) {
      console.log(error);
      throw new Error('Lỗi không thể lấy danh sách sản phẩm');
    }
  },

  async getOne(id: string): Promise<Product | null> {
    try {
      return await db.product.findUnique({
        where: {
          id,
        },
        include: {
          categories: {
            where: {
              deletedAt: null,
            },
          },
          discount: {
            where: {
              AND: [
                {
                  deletedAt: null,
                },
                {
                  active: true,
                },
              ],
            },
          },
          images: {
            where: {
              deletedAt: null,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Lỗi không thể lấy sản phẩm');
    }
  },

  async create(data: Prisma.ProductCreateInput) {
    try {
      if (data.categories && data.categories instanceof Array) {
        data.categories = {
          connect:
            data.categories.map((categoryId) => ({ id: categoryId })) || [],
        };
      }

      if (data.images && data.images instanceof Array) {
        data.images = {
          create: data.images.map((image) => ({ url: image })),
        };
      }
      return await db.product.create({
        data: { ...data, quantity: parseInt(data.quantity as any) || 0 },
      });
    } catch (error) {
      throw new Error('Lỗi không thể tạo sản phẩm');
    }
  },

  async update(id: string, data: Prisma.ProductUpdateInput) {
    try {
      if (data.categories && data.categories instanceof Array) {
        data.categories = {
          connect:
            data.categories.map((categoryId) => ({ id: categoryId })) || [],
        };
      }

      if (data.images && data.images instanceof Array) {
        data.images = {
          create: data.images.map((image) => ({ url: image })),
        };
      }
      return await db.product.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new Error('Lỗi không thể cập nhật sản phẩm');
    }
  },

  async delete(id: string): Promise<Product> {
    try {
      return await db.product.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Lỗi không thể xoá sản phẩm');
    }
  },
};
