import { addTodo, deleteTodoById } from '../../../../lib/todos';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body: { todo: string } = await req.json();

  await addTodo(body.todo);
  return new NextResponse(null, {
    status: 200 // OK status without headers
  });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse(JSON.stringify({ error: 'ID is required' }), { status: 400 });
  }

  // Delete the todo by id
  const wasDeleted = deleteTodoById(Number(id));

  if (wasDeleted) {
    return new NextResponse(JSON.stringify({ message: 'Todo deleted successfully' }), {
      status: 200
    });
  } else {
    return new NextResponse(JSON.stringify({ error: 'Todo not found' }), { status: 404 });
  }
}
