import Knex from 'knex';
import bcrypt from 'bcrypt';

// ESLint here prefers export default but for some reason it doesn't work
// with knex anymore?
export async function seed(knex:Knex): Promise<any> {
  return knex('users').insert([
    {
      email: 'admin@admin.com',
      // This is not for production of course
      // Just an example
      password: await bcrypt.hash('password', 10),
      admin: true,
      avatar: null,
    },
  ]);
}
