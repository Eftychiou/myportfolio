import { getTodos } from '../../../../lib/todos';
import { NextResponse } from 'next/server';

export async function GET() {
  const todos: Array<{ id: number; text: string }> = await getTodos();

  return new NextResponse(JSON.stringify(todos), {
    headers: { 'Content-Type': 'application/json' }
  });
}
