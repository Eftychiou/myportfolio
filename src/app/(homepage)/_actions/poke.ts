'use server';

import { redirect } from 'next/navigation';

export async function sayHello(name: string) {
  await new Promise((res, rej) => setTimeout(() => res(null), 3000));
  redirect('/projectss');
  console.log(`Hello, ${name}!`);
  return `Hello, ${name}!`;
}
