import { categoryModel } from '../models/category.model';
import { Request, Response } from 'express';

export const categoryController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const categories = await categoryModel.getAll(
        req.query.keyword as string
      );
      res.status(200).send({
        message: 'Lấy danh sách danh mục thành công',
        data: categories,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  getOneWithProducts: async (req: Request, res: Response) => {
    try {
      const category = await categoryModel.getOneWithProducts(req.params.id);
      if (!category) {
        res.status(404).send({ message: 'Không tìm thấy danh mục' });
      } else {
        res.status(200).send({
          message: 'Lấy danh mục thành công',
          data: category,
        });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const category = await categoryModel.create(req.body);
      res.status(200).send({
        message: 'Tạo danh mục thành công',
        data: category,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const category = await categoryModel.update(req.params.id, req.body);
      res.status(200).send({
        message: 'Cập nhật danh mục thành công',
        data: category,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const category = await categoryModel.delete(req.params.id);
      res.status(200).send({
        message: 'Xóa danh mục thành công',
        data: category,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },
};
