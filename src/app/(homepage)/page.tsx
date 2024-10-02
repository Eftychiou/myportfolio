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

// eslint-disable-next-line react/display-name
const ChildComponent = React.memo((props: { setLanguages: any }) => {
  return (
    <div className={[classes.first_chart, classes.chart].join(' ')}>
      <div className={classes.inner}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart
            onMouseLeave={() => {
              props.setLanguages(languagesList);
            }}
          >
            <Pie
              cursor='pointer'
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={(a: any) => renderCustomizedLabel(a, props.setLanguages, languagesList)}
              outerRadius={100}
              fill='#8884d8'
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
      <section id='about_me' className={classes.about_me}>
        <div className={classes.filler}></div>
        <span className={classes.clip}>
          <div className={classes.clip_image}></div>
        </span>

        <div className={classes.description_container}>
          <div className={classes.header_title}>
            <p>FULL STACK DEVELOPER 11</p>
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
              Having worked extensively with backend and frontend applications coupled with my professional
              certifications, I have gained exposure, and established various technical skills relating to web
              developing, Object Oriented Programming and Database Management. A proactive, self-motivated individual,
              with strong learning enthusiasm.
            </p>
          </div>
          <div className={classes.footer_title}>Since 2019</div>
        </div>
      </section>

      <section id='resume' className={classes.resume}>
        <div className={classes.title}>
          Resume
          <div />
        </div>
        <div className={classes.image}>
          <Image src='/images/react.png' alt='react' width={200} height={200} />
        </div>
        <div className={[classes.description, classes.cypos].join(' ')}>
          <Image src='/images/cypos.png' alt='cypos' width={100} height={100} className={classes.image} />
          <h2>CyposSystems</h2>
          <p>Software Developer</p>
          <p>2019 - 2022</p>
          <br />
          <p>Contributed to the creation and maintenance of software solutions.</p>
          <p>Developed and integrated APIs to enhance system functionalities.</p>
          <p>Worked on React applications, ensuring a seamless user experience.</p>
          <p>Collaborated with cross-functional teams to deliver high-quality software products.</p>
          <p>Participated in code reviews to maintain code quality and adherence to best practices.</p>
        </div>
        <div className={[classes.description, classes.amdocs].join(' ')}>
          <Image src='/images/amdocs.png' alt='amdocs' width={70} height={70} className={classes.image} />
          <h2>Amdocs</h2>
          <p>Software Developer</p>
          <p>2022 - Present</p>
          <br />
          <p>Continuing to develop and integrate APIs for enhanced system connectivity.</p>
          <p>Focused on creating React applications to meet user interface requirements.</p>
          <p>Participating in the design and implementation of scalable software solutions.</p>
          <p>Collaborating with team members to address complex technical challenges.</p>
          <p>Staying updated with industry trends and incorporating best practices into development processes.</p>
        </div>
      </section>

      <section id='skills' className={classes.skills} ref={skillsRef}>
        <div className={classes.image}>
          <Image src='/images/programming-languages.png' alt='languages' width={200} height={200} />
        </div>

        <div className={classes.title}>
          Skills <div />
        </div>
        <div className={classes.description}>
          <ul>
            <li className={languageActiveLabel === 'Javascript' ? classes.active : classes.inactive}>
              <strong>Javascript:</strong> Used extensively for frontend and backend development, including building
              interactive user interfaces and server-side scripting.
            </li>
            <li className={languageActiveLabel === 'NextJS' ? classes.active : classes.inactive}>
              <strong>NextJS:</strong> Leveraged for building server-rendered React applications with ease of use and
              enhanced performance.
            </li>
            <li className={languageActiveLabel === 'React' ? classes.active : classes.inactive}>
              <strong>React:</strong> Employed for building reusable UI components and developing single-page
              applications with efficient state management.
            </li>
            <li className={languageActiveLabel === 'CSS' ? classes.active : classes.inactive}>
              <strong>CSS:</strong> Utilized for styling web applications and ensuring a visually appealing user
              experience across different devices and screen sizes.
            </li>
            <li className={languageActiveLabel === 'NodeJS' ? classes.active : classes.inactive}>
              <strong>NodeJS:</strong> Used for building scalable and high-performance server-side applications, RESTful
              APIs, and real-time applications.
            </li>
            <li className={languageActiveLabel === 'MongoDB' ? classes.active : classes.inactive}>
              <strong>MongoDB:</strong> Employed as a NoSQL database solution for storing and managing unstructured data
              in web applications.
            </li>
            <li className={languageActiveLabel === 'SQL' ? classes.active : classes.inactive}>
              <strong>SQL:</strong> Utilized for querying and managing relational databases, ensuring data integrity and
              efficient data retrieval.
            </li>
            <li className={languageActiveLabel === 'Java' ? classes.active : classes.inactive}>
              <strong>Java:</strong> Employed for building scalable backend systems, Android mobile applications, and
              enterprise-level software solutions.
            </li>
            <li className={languageActiveLabel === 'Andoid Java' ? classes.active : classes.inactive}>
              <strong>Android Java:</strong> Utilized for developing native Android applications, leveraging the Android
              SDK and platform-specific APIs.
            </li>
            <li className={languageActiveLabel === 'NGINX' ? classes.active : classes.inactive}>
              <strong>NGINX:</strong> Employed as a reverse proxy server and load balancer for optimizing web server
              performance and managing incoming traffic.
            </li>
            <li className={languageActiveLabel === 'Docker' ? classes.active : classes.inactive}>
              <strong>Docker:</strong> Utilized for containerizing applications and deploying them in isolated
              environments, ensuring consistency across different development and production environments.
            </li>
          </ul>
        </div>
        {skillsIsShow && <ChildComponent setLanguages={setLanguages} />}

        {skillsIsShow && (
          <div className={[classes.second_chart, classes.chart].join(' ')}>
            <div className={classes.inner}>
              <div className={classes.chart_container}>
                <ResponsiveContainer width='100%' height='100%'>
                  <RadarChart
                    style={{ cursor: 'pointer' }}
                    cx='50%'
                    cy='50%'
                    outerRadius='70%'
                    data={languages}
                    onClick={(a) => {
                      setLanguageActiveLabel(a.activeLabel as string);
                      console.log(a.activeLabel);
                    }}
                  >
                    <PolarGrid />
                    <PolarAngleAxis
                      // stroke='#B0A1FE'
                      onMouseEnter={(a) => {
                        setLanguageActiveLabel(a.value);
                      }}
                      dataKey='subject'
                      onClick={(a) => {
                        setLanguageActiveLabel(a.value);
                      }}
                    />

                    {/* <PolarRadiusAxis /> */}
                    <Radar
                      dataKey='value'
                      stroke={languages.length === 7 ? '#CB247C' : '#34B4FF'}
                      fill={languages.length === 7 ? '#CB247C' : '#34B4FF'}
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </section>
      <section id='contact' className={classes.contact}>
        <div className={classes.links}>
          <div className={classes.link}>
            <Link href='mailto:eftichiou@hotmail.com' target='_blank'>
              <Image src='/images/email.png' alt='email' width={70} height={70} />
            </Link>
          </div>
          <div className={classes.link}>
            <Link href='https://www.linkedin.com/in/george-eftichiou-8b1a11100/' target='_blank'>
              <Image src='/images/linkedin.png' alt='linkedin' width={70} height={70} />
            </Link>
          </div>

          <div className={classes.link}>
            <Link href='https://www.facebook.com/profile.php?id=100011412591865' target='_blank'>
              <Image src='/images/facebook.png' alt='facebook' width={70} height={70} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
