'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import classes from './nav.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const Nav = () => {
  const pathname = usePathname();

  const router = useRouter();
  const links = [
    {
      name: 'Projects',
      href: '/projects',
      iconUrl: '/images/application.png'
    },
    {
      name: 'Admin',
      href: '/admin',
      iconUrl: '/images/application.png'
    }
  ];

  const sections = [
    { name: 'About Me', id: 'about_me', iconUrl: '/images/user.png' },
    { name: 'Resume', id: 'resume', iconUrl: '/images/portfolio.png' },
    { name: 'Skills', id: 'skills', iconUrl: '/images/social.png' },
    { name: 'Contact', id: 'contact', iconUrl: '/images/contact.png' }
  ];

  const onSectionClick = (id: string) => {
    document?.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const [selectedSection, setSelectedSection] = useState('');

  const handleIntersection = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setSelectedSection(entry.target.id);
      }
    });
  };

  useEffect(() => {
    if (pathname !== '/') {
      setSelectedSection('');
    }
  }, [pathname]);

  useEffect(() => {
    const options = {
      root: null, // use the viewport as the root
      rootMargin: '0px', // no margin
      threshold: 0.5 // trigger when 50% of the element is visible
    };

    const skillsRef = document.getElementById('skills');
    const resumeRef = document.getElementById('resume');
    const aboutmeRef = document.getElementById('about_me');
    const contactRef = document.getElementById('contact');

    const observer = new IntersectionObserver(handleIntersection, options);

    if (skillsRef) {
      observer.observe(skillsRef);
    }
    if (resumeRef) {
      observer.observe(resumeRef);
    }
    if (aboutmeRef) {
      observer.observe(aboutmeRef);
    }
    if (contactRef) {
      observer.observe(contactRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (skillsRef) {
        observer.unobserve(skillsRef);
      }
      if (resumeRef) {
        observer.unobserve(resumeRef);
      }
      if (aboutmeRef) {
        observer.unobserve(aboutmeRef);
      }
      if (contactRef) {
        observer.unobserve(contactRef);
      }
    };
  }, [pathname]);

  return (
    <nav className={classes.nav}>
      <Link className={classes.home} href='/'>
        <Image src='/images/home.png' alt='home' width={40} height={40} className={classes.image} />
      </Link>

      {sections.map((s, idx) => (
        <p
          key={idx}
          className={selectedSection === s.id ? [classes.link, classes.active].join(' ') : classes.link}
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
          <Image src={s.iconUrl} alt={s.name} width={25} height={25} className={classes.image} />
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
