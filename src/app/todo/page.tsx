import classes from './_styles/page.module.scss';
import { TodoList } from './_components/TodoList';
import { AddTodo } from './_components/AddTodo';

export const dynamic = 'force-dynamic'; // Disable static rendering

type Todo = { id: number; text: string };
const fetchTodos = (): Promise<Array<Todo>> => fetch('http://localhost:3003/api/todo').then((res) => res.json());

export default async function TodoPage() {
  let todos = await fetchTodos();

  return (
    <div className={classes.ToDoPage}>
      <TodoList todos={todos} />
      <AddTodo />
    </div>
  );
}
