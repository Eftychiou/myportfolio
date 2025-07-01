'use server';

import { revalidatePath } from 'next/cache';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function deleteTodo(id: number): Promise<void> {
  console.log('id', id);
  const res = await fetch(`${baseUrl}/api/todo/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error(`Failed to delete todo with id ${id}`);
  }
}

export async function addTodo(prevState: any, formData: FormData) {
  const todo = formData.get('todo') as string;

  const res = await fetch(`${baseUrl}/api/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ todo })
  });

  revalidatePath('/todo');

  if (!res.ok) {
    return {
      message: 'error'
    };
  }

  return {
    message: 'success'
  };
}
