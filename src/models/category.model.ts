import { db } from '../utils/db.server';
import { Prisma } from '@prisma/client';

type Category = {
  id: string;
  name: string;
};

type CategoryCreate = {
  id: string;
  name: string;
};

export const categoryModel = {
  async getAll(keyword?: string): Promise<Category[]> {
    try {
      return await db.category.findMany({
        where: {
          deletedAt: null,
          name: {
            contains: keyword,
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      throw new Error('Lỗi không thể lấy danh sách các danh mục');
    }
  },

  async getOneWithProducts(id: string): Promise<Category | null> {
    try {
      return await db.category.findUnique({
        where: {
          id,
        },
        include: {
          products: true,
        },
      });
    } catch (error) {
      throw new Error('Lỗi không thể lấy sản phẩm');
    }
  },

  async create(data: Prisma.CategoryCreateInput) {
    try {
      console.log(data);
      return await db.category.create({
        data,
      });
    } catch (error) {
      console.log(error);
      throw new Error('Lỗi không thể tạo danh mục mới');
    }
  },

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    try {
      return await db.category.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new Error('Lỗi không thể cập nhật sản phẩm');
    }
  },

  addProductToCategory: async (categoryId: string, productId: string) => {
    try {
      return await db.category.update({
        where: {
          id: categoryId,
        },
        data: {
          products: {
            connect: {
              id: productId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Lỗi không thể thêm sản phẩm vào danh mục');
    }
  },

  async delete(id: string) {
    try {
      return await db.category.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Lỗi không thể xóa sản phẩm');
    }
  },
};
