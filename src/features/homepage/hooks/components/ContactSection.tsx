import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_LINKS } from '@/app/(homepage)/constants';
import classes from '@/app/(homepage)/home.module.scss';

export const ContactSection = () => (
  <section id='contact' className={classes.contact}>
    <div className={classes.links}>
      {CONTACT_LINKS.map((link, index) => (
        <div className={classes.link} key={index}>
          <Link href={link.href} target='_blank'>
            <Image src={link.src} alt={link.alt} width={70} height={70} />
          </Link>
        </div>
      ))}
    </div>
  </section>
);
