import Link from 'next/link';
import classes from './projects.module.scss';

export default function Projects() {
  return (
    <div className={classes.page}>
      <section>
        <h1>Projects</h1>
        <div>
          <Link href='https://take.geef.cc' target='_blank'>
            Take
          </Link>
          <Link href='https://eshop.geef.cc' target='_blank'>
            Eshop
          </Link>
          <Link href='https://cypossystems.com.cy' target='_blank'>
            Cypos
          </Link>
        </div>
      </section>
    </div>
  );
}
