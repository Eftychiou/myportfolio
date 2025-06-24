// features/homepage/components/ResumeSection.tsx
import Image from 'next/image';
import { JOBS } from '@/app/(homepage)/_consts/constants';
import classes from '@/app/(homepage)/_styles/page.module.scss';
import dynamic from 'next/dynamic';
import { Spinner } from './Loader/SpinnerWithBackdrop';
import { FC } from 'react';
// import TestComponent from './Test';
const ReactImage = dynamic<{}>(
  () =>
    new Promise<{ default: FC<{}> }>((r) => {
      setTimeout(() => r(import('./ReactImage')), 3000);
    }),
  {
    loading: () => <Spinner />,
    ssr: false
  }
);

// This is will remove it from the initial bundle
const ResumeTitle = dynamic<{}>(() => import('./ResumeTitle'), {
  loading: () => <Spinner />,
  ssr: true
});

export const ResumeSection = () => (
  <section id='resume' className={classes.resume}>
    <div className={classes.title}>
      <ResumeTitle />
    </div>
    <div className={classes.image}>
      <ReactImage />
    </div>
    <div className={`${classes.image} ${classes.image2}`}>
      <Image src='/images/programming-languages.png' alt='languages' width={200} height={200} />
    </div>
    {JOBS.map((item, index) => (
      <div key={index} className={[classes.description, classes[item.className]].join(' ')}>
        <Image {...item.logo} className={classes.image} alt='' />
        <h2>{item.company}</h2>
        <p>{item.role}</p>
        <p>{item.period}</p>
        <br />
        <p>{item.description}</p>
      </div>
    ))}
  </section>
);
