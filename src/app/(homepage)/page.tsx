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

export default function Home() {
  const [skillsIsShow, setSkillsIsShown] = useState(false);
  const data = [
    { name: 'FRONTEND', value: 100 },
    { name: 'BACKEND', value: 68 }
  ];

  const COLORS = ['#34B4FF', '#CB247C'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={360}
          y={y}
          fill={data[index].name === 'FRONTEND' ? '#34B4FF' : '#CB247C'}
          textAnchor={'start'}
          dominantBaseline='central'
        >
          {`${data[index].name}`}
        </text>
      </>
    );
  };
  const [languages, setLanguages] = useState([
    {
      subject: 'Javascript',
      value: 95
    },
    {
      subject: 'NextJS',
      value: 95
    },
    {
      subject: 'React',
      value: 95
    },
    {
      subject: 'CSS',
      value: 95
    },
    {
      subject: 'NodeJS',
      value: 80
    },
    {
      subject: 'MongoDB',
      value: 70
    },
    {
      subject: 'SQL',
      value: 50
    },
    {
      subject: 'Java',
      value: 50
    },
    {
      subject: 'Andoid Java',
      value: 20
    },
    {
      subject: 'NGINX',
      value: 50
    },

    {
      subject: 'Docker',
      value: 75
    }
  ]);

  const targetRef = useRef(null);

  const handleIntersection = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        // Element is now in the viewport
        console.log('Element is in the viewport');
        // Call your function here
        yourFunction();
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null, // use the viewport as the root
      rootMargin: '0px', // no margin
      threshold: 0.5 // trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []); // Run effect only once on mount

  const yourFunction = () => {
    // Your function logic goes here
    setSkillsIsShown(true);
  };

  return (
    <div className={classes.page}>
      <div className={classes.hero} id='hero'>
        {/* <Image src='/images/hero.jpg' fill /> */}
        <div
          className={classes.image_cover}
          style={{
            background: `url('${'http://localhost:3000/images/hero.jpg'}') no-repeat center`
          }}
        >
          <div className={classes.content}>
            <h1>Hello I am Giorgos</h1>
            <br />
            <p>Welcome</p>
          </div>
        </div>
      </div>

      <section id='about_me' className={classes.about_me}>
        {/* <div className={classes.clip}></div> */}
        <div className={classes.title}>
          About Me
          <div />
        </div>
        <div className={classes.image}>
          <Image src='/images/aboutme.png' alt='something' fill />
        </div>

        <div className={classes.secondary_title}>FULL STACK DEVELOPER</div>
        <div className={classes.secondary_title}>Since 2019</div>
        <div className={classes.description}>
          <p>
            In 2019, I embarked on a transformative journey into the dynamic realm of web development. Fueled by a
            passion for crafting immersive digital experiences, my expertise revolves around harnessing the power of
            React, JavaScript, CSS, and Node.js. I thrive on the intricate dance of code, consistently pushing
            boundaries and elevating user interfaces to new heights.
          </p>

          <p>
            Beyond the web, I delve into the expansive world of Java, seamlessly weaving through Android and Spring
            frameworks to bring my ideas to life. My journey extends beyond mere technical mastery; its a canvas where
            creativity meets functionality.
          </p>

          <p>
            As I navigate this ever-evolving landscape, I am not just a developer; I am a creator weaving lines of code
            into digital tapestries. Join me on this exciting venture, where innovation meets expression, and each
            project is a testament to my commitment to excellence.
          </p>
        </div>
      </section>

      <section id='resume' className={classes.resume}>
        <div className={classes.title}>
          Resume
          <div />
        </div>
        <div className={classes.image}>
          <Image src='/images/company.png' alt='something' width={200} height={200} />
        </div>

        <div className={[classes.description, classes.cypos].join(' ')}>
          <Image src='/images/cypos.png' alt='something' width={100} height={100} className={classes.image} />
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
          <Image src='/images/amdocs.png' alt='something' width={70} height={70} className={classes.image} />
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
      <section id='skills' className={classes.skills} ref={targetRef}>
        <div className={classes.image}>
          <Image src='/images/programming-languages.png' alt='something' width={200} height={200} />
        </div>

        <div className={classes.title}>
          Skills <div />
        </div>
        <div className={classes.description}>
          <ul>
            <li>
              <strong>HTML5 & CSS3:</strong> Proficient in creating semantic and well-structured HTML documents, coupled
              with advanced CSS for styling and layout.
            </li>
            <li>
              <strong>JavaScript (ES6+):</strong> Strong command over modern JavaScript, including ES6+ features, for
              building interactive and dynamic user interfaces.
            </li>
            <li>
              <strong>Responsive Design:</strong> Skilled in designing and implementing responsive layouts that
              seamlessly adapt to various devices and screen sizes.
            </li>
            <li>
              <strong>HTML5 & CSS3:</strong> Proficient in creating semantic and well-structured HTML documents, coupled
              with advanced CSS for styling and layout.
            </li>
            <li>
              <strong>JavaScript (ES6+):</strong> Strong command over modern JavaScript, including ES6+ features, for
              building interactive and dynamic user interfaces.
            </li>
            <li>
              <strong>Responsive Design:</strong> Skilled in designing and implementing responsive layouts that
              seamlessly adapt to various devices and screen sizes.
            </li>
          </ul>
        </div>

        {skillsIsShow && (
          <div className={[classes.first_chart, classes.chart].join(' ')}>
            <div className={classes.inner}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    cursor='pointer'
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        onClick={() => {
                          if (index === 0) {
                            setLanguages([
                              {
                                subject: 'Javascript',
                                value: 95
                              },
                              {
                                subject: 'NextJS',
                                value: 95
                              },
                              {
                                subject: 'React',
                                value: 95
                              },
                              {
                                subject: 'CSS',
                                value: 95
                              }
                            ]);
                          } else if (index === 1) {
                            setLanguages([
                              {
                                subject: 'NodeJS',
                                value: 80
                              },
                              {
                                subject: 'MongoDB',
                                value: 70
                              },
                              {
                                subject: 'SQL',
                                value: 50
                              },
                              {
                                subject: 'Java',
                                value: 50
                              },
                              {
                                subject: 'Andoid Java',
                                value: 20
                              },
                              {
                                subject: 'NGINX',
                                value: 50
                              },

                              {
                                subject: 'Docker',
                                value: 75
                              }
                            ]);
                          }
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {skillsIsShow && (
          <div className={[classes.second_chart, classes.chart].join(' ')}>
            <div className={classes.inner}>
              <div className={classes.chart_container}>
                <ResponsiveContainer width='100%' height='100%'>
                  <RadarChart cx='50%' cy='50%' outerRadius='70%' data={languages}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey='subject' />
                    {/* <PolarRadiusAxis /> */}
                    <Radar dataKey='value' stroke='#34B4FF' fill='#34B4FF' fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
