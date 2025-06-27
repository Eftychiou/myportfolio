import { addTodo, getTodos } from '../../../../lib/todos';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Disable static rendering

export async function POST(req: NextRequest) {
  const body: { todo: string } = await req.json();

  const wasAdded = await addTodo(body.todo);

  if (wasAdded) {
    return NextResponse.json({ message: 'Todo added successfully' }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
}

export async function GET() {
  const todos: Array<{ id: number; text: string }> = await getTodos();

  return new NextResponse(JSON.stringify(todos), {
    headers: { 'Content-Type': 'application/json' }
  });
}
