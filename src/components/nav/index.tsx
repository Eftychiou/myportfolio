'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import classes from './nav.module.scss';
import Image from 'next/image';

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const links = [
    {
      name: 'Projects',
      href: '/projects',
      iconUrl: '/images/application.png'
    }
  ];

  const sections = [
    { name: 'About Me', id: 'about_me', iconUrl: '/images/user.png' },
    { name: 'Resume', id: 'resume', iconUrl: '/images/portfolio.png' },
    { name: 'Skills', id: 'skills', iconUrl: '/images/social.png' }
  ];

  const onSectionClick = (id: string) => {
    document?.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <nav className={classes.nav}>
      <Link className={pathname === '/' ? [classes.link, classes.active].join(' ') : classes.link} href='/'>
        <Image src='/images/home.png' alt='something' width={25} height={25} className={classes.image} />
        Home
      </Link>

      {sections.map((s, idx) => (
        <p
          key={idx}
          className={classes.link}
          onClick={() => {
            if (pathname !== '/') {
              router.push('/');
              setTimeout(() => {
                onSectionClick(s.id);
              }, 100);
            } else {
              onSectionClick(s.id);
            }
          }}
        >
          <Image src={s.iconUrl} alt='something' width={25} height={25} className={classes.image} />
          {s.name}
        </p>
      ))}
      {links.map((l, idx) => {
        const isActive = pathname?.startsWith(l.href);
        return (
          <Link className={isActive ? [classes.link, classes.active].join(' ') : classes.link} key={idx} href={l.href}>
            <Image src={l.iconUrl} alt='something' width={25} height={25} className={classes.image} />
            {l.name}
          </Link>
        );
      })}
    </nav>
  );
};
