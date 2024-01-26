import { db } from '../utils/db.server';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

type User = {
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
};

type UserCreate = {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
};

export const userModel = {
  listUsers: async (): Promise<User[]> => {
    try {
      const users = await db.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Lỗi lấy danh sách user');
    }
  },

  getUserById: async (id: string): Promise<User | null> => {
    try {
      const user = await db.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Lỗi lấy user');
    }
  },

  createUser: async (user: UserCreate): Promise<User> => {
    try {
      return await db.user.create({
        data: {
          ...user,
          password: await bcrypt.hash(user.password, 10),
        },
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.meta?.target === 'User_email_key'
      ) {
        throw new Error('Email đã tồn tại');
      } else {
        throw new Error('Lỗi gì đó');
      }
    }
  },

  updateUser: async (id: string, user: Partial<UserCreate>): Promise<User> => {
    try {
      const updatedUser = await db.user.update({
        where: {
          id,
        },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      throw new Error('Lỗi cập nhật user');
    }
  },

  deleteUser: async (id: string): Promise<User> => {
    try {
      return await db.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Lỗi xóa user');
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) throw new Error();
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error();

      return user;
    } catch (error) {
      throw new Error('Lỗi đăng nhập');
    }
  },
};
