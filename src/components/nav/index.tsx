'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import classes from './nav.module.scss';

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const links = [
    {
      name: 'Projects',
      href: '/projects'
    }
  ];

  const sections = [
    { name: 'About Me', id: 'about_me' },
    { name: 'Resume', id: 'resume' },
    { name: 'Skills', id: 'skills' }
  ];

  const onSectionClick = (id: string) => {
    document?.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <nav className={classes.nav}>
      <Link className={pathname === '/' ? [classes.link, classes.active].join(' ') : classes.link} href='/'>
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
          {s.name}
        </p>
      ))}
      {links.map((l, idx) => {
        const isActive = pathname?.startsWith(l.href);
        return (
          <Link className={isActive ? [classes.link, classes.active].join(' ') : classes.link} key={idx} href={l.href}>
            {l.name}
          </Link>
        );
      })}
    </nav>
  );
};
