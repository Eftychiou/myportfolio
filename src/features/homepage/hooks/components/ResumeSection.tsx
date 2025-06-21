// features/homepage/components/ResumeSection.tsx
import Image from 'next/image';
import { JOBS } from '@/app/(homepage)/constants';
import classes from '@/app/(homepage)/home.module.scss';

export const ResumeSection = () => (
  <section id='resume' className={classes.resume}>
    <div className={classes.title}>
      Resume <div />
    </div>
    <div className={classes.image}>
      <Image src='/images/react.png' alt='react' width={200} height={200} />
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
