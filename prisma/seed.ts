import { db } from '../src/utils/db.server';

type UserCreate = {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
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

function seed() {
  users.forEach(async (user) => {
    await db.user.create({
      data: user,
    });
  });
}

seed();
