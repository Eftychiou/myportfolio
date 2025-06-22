import { useFormState } from 'react-dom';
import { sendEmail } from '@/app/(homepage)/_actions/sendEmail';
import { Loader } from '../Loader/Loader';
import classes from './EmailForm.module.scss';

export const EmailForm = () => {
  const [state, formAction] = useFormState(sendEmail, { status: 'idle' });
  return (
    <form action={formAction} className={classes.form}>
      <textarea id='message' name='message' placeholder='Your message...' required />
      <button type='submit' disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      <Loader />
      {state.status === 'success' && <p>✅ Message sent successfully!</p>}
      {state.status === 'error' && <p style={{ color: 'red' }}>❌ {state.message}</p>}
    </form>
  );
};
