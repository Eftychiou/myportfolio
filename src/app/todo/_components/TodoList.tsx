'use client';

import { TransitionStartFunction, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { deleteTodo } from '../_actions';
import classes from '../_styles/page.module.scss';

type Todo = { id: number; text: string };

const convertLinksToAnchors = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
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

export function TodoList({
  todos,
  isPending,
  startTransition
}: {
  todos: Todo[];
  isPending: boolean;
  startTransition: TransitionStartFunction;
}) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    deleteTodo(id);
    startTransition(() => {
      router.refresh(); // Refetch the server component
    });
  };

  return (
    <List>
      {todos.map((t) => (
        <ListItem key={t.id} className={classes.customListItem} sx={{ flex: '0 0 auto', width: 'fit-content' }}>
          <ListItemText primary={convertLinksToAnchors(t.text)} />
          <IconButton onClick={() => handleDelete(t.id)} edge='end' aria-label='delete' disabled={isPending}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
