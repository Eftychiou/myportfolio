'use client';
import { useEffect, useState } from 'react';
import classes from './_styles/page.module.scss';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material'; // Import the delete icon

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

export default function TodoPage() {
  const [todos, setTodos] = useState<Array<{ id: number; text: string }>>([]);
  const [todoInput, setTodoInput] = useState('');

  const fetchTodos = () => {
    fetch('/api/todo')
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!todoInput.trim()) return; // Prevent adding empty todos

    await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo: todoInput })
    });
    fetchTodos();
    setTodoInput(''); // Clear the input after adding
  };

  const deleteTodo = async (id: number) => {
    const response = await fetch(`/api/todo?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // Refresh the todos list after deletion
      fetchTodos();
    } else {
      const error = await response.json();
      console.error('Error deleting todo:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className={classes.ToDoPage}>
      <List className={classes.list}>
        {todos.map((t, i) => (
          <ListItem
            key={i}
            className={classes.customListItem}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <ListItemText
              primary={convertLinksToAnchors(t.text)} // Apply the link conversion function here
              className={classes.customListItemText}
            />
            <IconButton onClick={() => deleteTodo(t.id)} edge='end' aria-label='delete'>
              <DeleteIcon /> {/* X button (delete icon) */}
            </IconButton>
          </ListItem>
        ))}
      </List>

      <div className={classes.Form}>
        <TextField
          label='Enter a new task'
          variant='outlined'
          fullWidth
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          margin='normal'
          className={classes.customTextField}
          onKeyDown={handleKeyDown}
        />

        <Button
          variant='contained'
          color='primary'
          onClick={addTodo}
          disabled={!todoInput.trim()} // Disable button if input is empty
          fullWidth
        >
          Add To Do
        </Button>
      </div>
    </div>
  );
}
