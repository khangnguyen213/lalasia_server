import { create } from 'domain';
import { db } from '../utils/db.server';

type User = {
  id: string;
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
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

  createUser: async (user: UserCreate): Promise<User> => {
    try {
      const newUser = await db.user.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      throw new Error('Lỗi tạo user');
    }
  },
};
