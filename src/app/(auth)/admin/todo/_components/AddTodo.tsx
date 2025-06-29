'use client';
import { Button, TextField } from '@mui/material';
import { TransitionStartFunction, useEffect, useState, useTransition } from 'react';
import classes from '../_styles/page.module.scss';
import { addTodo } from '../_actions/index';
import { useFormState } from 'react-dom';
import { Spinner } from '../../../../../shared/components/Loader/SpinnerWithBackdrop';

export const AddTodo = ({
  isPending,
  startTransition
}: {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}) => {
  const [state, formAction] = useFormState(addTodo, { message: '' });

  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (formData: FormData) => {
    const todoText = formData.get('todo')?.toString().trim() ?? '';
    if (todoText === '') {
      setError('Please enter a task.');
      return;
    }

    setError('');
    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.message === 'success') {
      setInput('');
    }
  }, [state]);

  return (
    <form action={handleSubmit} className={classes.Form}>
      <TextField
        disabled={isPending}
        id='todo'
        name='todo'
        label='Enter a new task'
        variant='outlined'
        fullWidth
        margin='normal'
        className={classes.customTextField}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button type='submit' variant='contained' color='primary' fullWidth disabled={isPending}>
        {isPending ? <Spinner size={30} /> : 'Adding Todo'}
      </Button>
    </form>
  );
};
