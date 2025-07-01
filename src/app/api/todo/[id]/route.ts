import { deleteTodoById } from '../../../../../lib/todos';
import { NextResponse, NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Disable static rendering

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const wasDeleted = await deleteTodoById(Number(id));

  if (wasDeleted) {
    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
}
