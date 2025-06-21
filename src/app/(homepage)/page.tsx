'use client';

import classes from './home.module.scss';
import { IFrameGame } from '@/components/IFrameGame/IFrameGame';
import { AboutSection } from '@/features/homepage/hooks/components/AboutSection';
import { ResumeSection } from '@/features/homepage/hooks/components/ResumeSection';
import { SkillsSection } from '@/features/homepage/hooks/components/SkillsSection';
import { ContactSection } from '@/features/homepage/hooks/components/ContactSection';
import { StarsMouseCanvas } from '@/features/homepage/hooks/components/StarsMouseCanvas';

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
