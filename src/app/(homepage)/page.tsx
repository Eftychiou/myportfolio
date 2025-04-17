'use client';

import classes from './home.module.scss';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { COLORS, RADIAN, data, renderCustomizedLabel, languagesList } from './data';
import { setup } from './canvas';
import React from 'react';
import Link from 'next/link';
import { IFrameGame } from '@/components/IFrameGame/IFrameGame';
import { CONTACT_LINKS, JOBS, SKILLS } from './constants';

const FirstChart = React.memo((props: { setLanguages: any }) => {
  return (
    <div className={classes.first_chart}>
      <div className={classes.inner}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart onMouseLeave={() => props.setLanguages(languagesList)}>
            <Pie
              cursor='pointer'
              data={data}
              cx='30%'
              cy='50%'
              labelLine={false}
              label={(a: any) => renderCustomizedLabel(a, props.setLanguages, languagesList)}
              outerRadius={100}
              // fill='#8884d8'
              dataKey='value'
            >
              {data.map((entry, index) => (
                <Cell
                  style={{ outline: 'none' }}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  onClick={() => {
                    if (index === 0) {
                      props.setLanguages(languagesList.filter((l) => l.type === 'frontend'));
                    } else if (index === 1) {
                      props.setLanguages(languagesList.filter((l) => l.type === 'backend'));
                    }
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

FirstChart.displayName = 'FirstChart';

const SecondChart = React.memo((props: { languages: any; setLanguageActiveLabel: any }) => {
  return (
    <div className={classes.second_chart}>
      <div className={classes.inner}>
        <div className={classes.chart_container}>
          <ResponsiveContainer width='100%' height='100%'>
            <RadarChart
              style={{ cursor: 'pointer' }}
              cx='60%'
              cy='50%'
              outerRadius='70%'
              data={props.languages}
              onClick={(a) => props.setLanguageActiveLabel(a.activeLabel as string)}
            >
              <PolarGrid />
              <PolarAngleAxis
                stroke='white'
                onMouseEnter={(a) => props.setLanguageActiveLabel(a.value)}
                dataKey='subject'
                onClick={(a) => props.setLanguageActiveLabel(a.value)}
              />

              {/* <PolarRadiusAxis /> */}
              <Radar
                dataKey='value'
                stroke={props.languages.length === 7 ? '#CB247C' : '#5f7d6e'}
                fill={props.languages.length === 7 ? '#CB247C' : '#5f7d6e'}
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});

SecondChart.displayName = 'SecondChart';

export default function Home() {
  const [skillsIsShow, setSkillsIsShown] = useState(false);
  const [languageActiveLabel, setLanguageActiveLabel] = useState('');

  const [languages, setLanguages] = useState(languagesList);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  const skillsRef = useRef(null);

  useEffect(() => {
    if (window && document) {
      setup(window);
    }
  }, []);

  const handleIntersection = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setSkillsIsShown(true);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', function (event) {
      // Get the horizontal position of the mouse
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Get the width of the screen
      const screenWidth = window.innerWidth;
      const screenHeigh = window.innerHeight;

      const leftEye = leftEyeRef.current;
      const rightEye = rightEyeRef.current;

      if (mouseY < screenHeigh / 5) {
        leftEye?.classList.remove(classes.isBottom);
        rightEye?.classList.remove(classes.isBottom);
      } else {
        leftEye?.classList.add(classes.isBottom);
        rightEye?.classList.add(classes.isBottom);
      }
      // Determine if the mouse is on the left half or the right half
      if (mouseX < screenWidth / 1.15) {
        leftEye?.classList.remove(classes.isRight);
        rightEye?.classList.remove(classes.isRight);
      } else {
        leftEye?.classList.add(classes.isRight);
        rightEye?.classList.add(classes.isRight);
      }
    });
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const downloadFile = () => {
    // Create a Blob with the file content
    const blob = new Blob([''], { type: 'application/pdf' });
    const url = '/George-Eftichiou-CV.pdf';

    // Create a temporary <a> element to initiate the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'George-Eftichiou-CV.pdf';

    // Append the <a> element to the document body
    document.body.appendChild(a);

    // Initiate the download
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className={classes.page}>
      <canvas id='world' width='383' height='898'></canvas>
      <IFrameGame />

      <section id='about_me' className={classes.about_me}>
        {/* <div className={classes.filler}></div> */}
        <span className={classes.clip}>
          <div className={classes.clip_image}></div>
        </span>

        <div className={classes.description_container}>
          <div className={classes.header_title}>
            <p>Software Developer</p>
          </div>
          <div className={classes.description}>
            <div className={classes.image}>
              <Image src='/images/aboutme.png' alt='aboutme' width={100} height={100} />
              <div id='lid' className={classes.eye}>
                <div ref={leftEyeRef}></div>
              </div>
              <div id='lid' className={classes.eye_2}>
                <div ref={rightEyeRef}></div>
              </div>
              <div onClick={() => downloadFile()} className={`${classes.cloud} ${classes.grow} ${classes.left}`}>
                Download CV
              </div>
            </div>
            <p>
              Having worked extensively with frontend applications coupled with my professional certifications I have
              gained exposure and established various technical skills relating to web developing. A proactive, self
              motivated individual, with strong learning enthusiasm. I relish the opportunity to work as part of a team,
              enjoying the challenge of taking on new roles and responsibilities in dynamic working environments.
            </p>
          </div>
          <div className={classes.footer_title}>Since 2019</div>
        </div>
      </section>

      <section id='resume' className={classes.resume}>
        <div className={classes.title}>
          Resume <div />
        </div>
        <div className={classes.image}>
          <Image src='/images/react.png' alt='react' width={200} height={200} />
        </div>
        <div className={`${classes.image} ${classes.image2}`}>
          <Image src='/images/programming-languages.png' alt='languages' width={200} height={200} />
        </div>
        {JOBS.map((item, index) => (
          <div key={index} className={[classes.description, classes[item.className]].join(' ')}>
            <Image
              src={item.logo.src}
              alt={item.logo.alt}
              width={item.logo.width}
              height={item.logo.height}
              className={classes.image}
            />
            <h2>{item.company}</h2>
            <p>{item.role}</p>
            <p>{item.period}</p>
            <br />
            <p>{item.description}</p>
          </div>
        ))}
      </section>

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
            <FirstChart setLanguages={setLanguages} />
            <SecondChart languages={languages} setLanguageActiveLabel={setLanguageActiveLabel} />
          </div>
        )}
      </section>

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
    </div>
  );
}
