'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { deleteTodo } from '../_actions'; // adjust path as needed

type Todo = { id: number; text: string };

const convertLinksToAnchors = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex to match URLs
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target='_blank'
        rel='noopener noreferrer'
        style={{ color: '#007bff', textDecoration: 'underline' }}
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

export function TodoList({ todos }: { todos: Todo[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    startTransition(() => {
      router.refresh(); // Refetch the server component
    });
  };

  return (
    <List>
      {todos.map((t) => (
        <ListItem
          key={t.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <ListItemText primary={convertLinksToAnchors(t.text)} />
          <IconButton onClick={() => handleDelete(t.id)} edge='end' aria-label='delete' disabled={isPending}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
