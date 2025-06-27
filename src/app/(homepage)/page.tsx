import { IFrameGame } from '@/app/(homepage)/_components/IFrameGame/IFrameGame';
import { ResumeSection } from '@/app/(homepage)/_components/ResumeSection';
import { SkillsSection } from '@/app/(homepage)/_components/SkillsSection';
import { ContactSection } from '@/app/(homepage)/_components/ContactSection';
import { StarsMouseCanvas } from '@/app/(homepage)/_components/StarsMouseCanvas';
import AboutSection from './_components/AboutSection';
import { sendMessageToWhatsUp } from '../../../lib';
import classes from './_styles/page.module.scss';
import { Poke } from './_components/Poke';

export const dynamic = 'force-dynamic'; // THIS MAKES IT RUN ON EVERY REQUEST

export default function Homepage() {
  if (process.env.NODE_ENV === 'production') {
    sendMessageToWhatsUp('You have visitor in the website');
  }

  return (
    <div className={classes.page}>
      <StarsMouseCanvas />
      <IFrameGame />
      <AboutSection />
      <ResumeSection />
      <SkillsSection />
      <ContactSection />
      <Poke />
    </div>
  );
}
