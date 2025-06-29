'use client';

import { useTransition } from 'react';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';

type Todo = { id: number; text: string };

export function TodoClientWrapper({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <AddTodo isPending={isPending} startTransition={startTransition} />
      <TodoList todos={todos} isPending={isPending} startTransition={startTransition} />
    </>
  );
}
