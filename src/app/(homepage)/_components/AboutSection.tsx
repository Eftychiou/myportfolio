'use client';
// features/homepage/components/AboutSection.tsx
import Image from 'next/image';
import { downloadFile } from '@/lib';
import classes from '@/app/(homepage)/_styles/page.module.scss';
import { useIframeMessageListener } from '../_hooks/useIframeMessageListener';
import { useEyeMovement } from '../_hooks/useEyeMovement';
import { useRef } from 'react';
import { redirect, useRouter } from 'next/navigation';

const AboutSection = () => {
  const latestChatMsg = useIframeMessageListener();
  const { leftEyeRef, rightEyeRef } = useEyeMovement();
  const clickTimesRef = useRef<number[]>([]);
  const router = useRouter();

  const handleImageClick = () => {
    const now = Date.now();
    const times = clickTimesRef.current;

    times.push(now);

    if (times.length > 3) times.shift();

    if (times.length === 3) {
      if (times[2] - times[0] <= 1000) {
        // 500ms between each → 1000ms total between first and last

        clickTimesRef.current = []; // reset
        router.push('/admin');
      }
    }
  };
  return (
    <section id='about_me' className={classes.about_me}>
      <p className={classes.latest_chat_msg}>{latestChatMsg}</p>
      <span className={classes.clip}>
        <div className={classes.clip_image}></div>
      </span>
      <div className={classes.description_container}>
        <div className={classes.header_title}>
          <p>Software Developer</p>
        </div>
        <div className={classes.description}>
          <div className={classes.image}>
            <Image src='/images/aboutme.png' alt='aboutme' width={100} height={100} onClick={handleImageClick} />
            <div id='lid' className={classes.eye}>
              <div ref={leftEyeRef}></div>
            </div>
            <div id='lid' className={classes.eye_2}>
              <div ref={rightEyeRef}></div>
            </div>
            <div onClick={downloadFile} className={`${classes.cloud} ${classes.grow} ${classes.left}`}>
              Download CV
            </div>
          </div>
          <p>
            Having worked extensively with frontend applications coupled with my professional certifications I have
            gained exposure and established various technical skills relating to web developing. A proactive, self
            motivated individual, with strong learning enthusiasm. I relish the opportunity to work as part of a team,
            enjoying the challenge of taking on new roles and responsibilities in dynamic working environments...
          </p>
        </div>
        <div className={classes.footer_title}>Since 2019</div>
      </div>
    </section>
  );
};

export default AboutSection;
