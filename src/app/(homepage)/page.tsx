'use client';

import classes from './_styles/page.module.scss';
import { IFrameGame } from '@/app/(homepage)/_components/IFrameGame/IFrameGame';
import { ResumeSection } from '@/app/(homepage)/_components/ResumeSection';
import { SkillsSection } from '@/app/(homepage)/_components/SkillsSection';
import { ContactSection } from '@/app/(homepage)/_components/ContactSection';
import { StarsMouseCanvas } from '@/app/(homepage)/_components/StarsMouseCanvas';

import AboutSection from './_components/AboutSection';

export default function Homepage() {
  return (
    <div className={classes.page}>
      <StarsMouseCanvas />
      <IFrameGame />
      <AboutSection />
      <ResumeSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
