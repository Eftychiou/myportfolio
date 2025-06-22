// features/homepage/components/SkillsSection.tsx
import { SKILLS } from '@/app/(homepage)/_consts/constants';
import classes from '@/app/(homepage)/_styles/page.module.scss';
import { PercentageChart } from './PercentageChart';
import { WebChart } from './WebChart';
import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../_hooks/useIntersectionObserver';
import { languagesList } from '@/app/(homepage)/_consts/data';

export const SkillsSection = () => {
  const [languageActiveLabel, setLanguageActiveLabel] = useState('');
  const [languages, setLanguages] = useState(languagesList);
  const [skillsIsShow, setSkillsIsShown] = useState(false);
  const skillsRef = useRef(null);

  useIntersectionObserver(skillsRef, () => setSkillsIsShown(true));

  return (
    <section id='skills' className={classes.skills} ref={skillsRef}>
      <div className={classes.title}>
        Skills <div />
      </div>
      <div className={classes.description}>
        <ul>
          {SKILLS.map((item, index) => (
            <li key={index} className={languageActiveLabel === item.label ? classes.active : classes.inactive}>
              <strong>{item.label}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>
      {skillsIsShow && (
        <div className={classes.charts}>
          <PercentageChart setLanguages={setLanguages} />
          <WebChart languages={languages} setLanguageActiveLabel={setLanguageActiveLabel} />
        </div>
      )}
    </section>
  );
};
