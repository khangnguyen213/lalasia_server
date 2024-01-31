import { productModel } from '../models/product.model';
import { Request, Response } from 'express';

export const productController = {
  getAll: async (req: Request, res: Response) => {
    console.log(req.session.user);
    try {
      const products = await productModel.getAll(
        req.query.keyword as string,
        req.query.nPerPage as string,
        req.query.page as string,
        req.query.sortName as string,
        req.query.sortPrice as string,
        req.query.sortCreatedAt as string
      );
      res.status(200).send({
        message: 'Lấy danh sách sản phẩm thành công',
        data: products,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const product = await productModel.getOne(req.params.id);
      if (!product) {
        res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
      } else {
        res.status(200).send({
          message: 'Lấy sản phẩm thành công',
          data: product,
        });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const product = await productModel.create(req.body);
      res.status(200).send({
        message: 'Tạo sản phẩm thành công',
        data: product,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const product = await productModel.update(req.params.id, req.body);
      res.status(200).send({
        message: 'Cập nhật sản phẩm thành công',
        data: product,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const product = await productModel.delete(req.params.id);
      res.status(200).send({
        message: 'Xóa sản phẩm thành công',
        data: product,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },
};
