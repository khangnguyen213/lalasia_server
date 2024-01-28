import { db } from '../src/utils/db.server';
import bcrypt from 'bcrypt';

type UserCreate = {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
};

type ProductCreate = {
  name: string;
  desc: string;
  price: string;
  quantity: number;
  categories: {
    connect: [{ id: string }];
  };
  images: {
    create: [{ url: string }];
  };
};

type CategoryCreate = {
  id: string;
  name: string;
};

const users: UserCreate[] = [
  {
    email: 'khang@gmail.com',
    password: 'password1',
    phone: '0934909777',
    first_name: 'Khang',
    last_name: 'Nguyen',
  },
  {
    email: 'sally@gmail.com',
    password: 'password1',
    phone: '012390909',
    first_name: 'Sally',
    last_name: 'Tran',
  },
];

const products: ProductCreate[] = [
  {
    name: 'Sofa',
    desc: 'Sofa description',
    price: '1000000',
    quantity: 10,
    categories: {
      connect: [{ id: 'furniture' }],
    },
    images: {
      create: [{ url: 'https://picsum.photos/200' }],
    },
  },
  {
    name: 'Chair',
    desc: 'Chair description',
    price: '500000',
    quantity: 10,
    categories: {
      connect: [{ id: 'furniture' }],
    },
    images: {
      create: [{ url: 'https://picsum.photos/200' }],
    },
  },
  {
    name: 'Table',
    desc: 'Table description',
    price: '2000000',
    quantity: 10,
    categories: {
      connect: [{ id: 'furniture' }],
    },
    images: {
      create: [{ url: 'https://picsum.photos/200' }],
    },
  },
  {
    name: 'Lamp',
    desc: 'Lamp description',
    price: '500000',
    quantity: 10,
    categories: {
      connect: [{ id: 'lighting' }],
    },
    images: {
      create: [{ url: 'https://picsum.photos/200' }],
    },
  },
  {
    name: 'Painting',
    desc: 'Painting description',
    price: '500000',
    quantity: 10,
    categories: {
      connect: [{ id: 'decor' }],
    },
    images: {
      create: [{ url: 'https://picsum.photos/200' }],
    },
  },
];

const categories: CategoryCreate[] = [
  { id: 'furniture', name: 'Furniture' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'decor', name: 'Decor' },
];

async function seed() {
  if ((await db.user.count()) === 0) {
    users.forEach(async (user) => {
      await db.user.create({
        data: {
          ...user,
          password: await bcrypt.hash(user.password, 10),
          shopping_session: {
            create: {},
          },
          address: {
            create: {
              address: '',
              city: '',
              district: '',
              recipient_name: '',
              recipient_phone: '',
            },
          },
        },
      });
    });
  }

  if ((await db.product.count()) === 0) {
    products.forEach(async (product) => {
      await db.product.create({
        data: product,
      });
    });
  }

  if ((await db.category.count()) === 0) {
    categories.forEach(async (category) => {
      await db.category.create({
        data: category,
      });
    });
  }
}

seed();
