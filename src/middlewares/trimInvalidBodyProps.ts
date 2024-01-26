import { Request, Response, NextFunction } from 'express';

export const trimInvalidBodyProps = (props: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    for (const prop in body) {
      if (!props.includes(prop)) {
        delete body[prop];
      }
    }
    next();
  };
};
