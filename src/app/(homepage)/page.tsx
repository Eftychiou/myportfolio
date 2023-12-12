'use client';
import Image from 'next/image';
import classes from './page.module.scss';

export default function Home() {
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
        <div className={classes.image_wrapper}>
          <Image
            src='/images/profile_1.jpg'
            alt='giorgos_eftychiou_profile_1'
            fill
            placeholder='blur'
            blurDataURL={'/images/profile_1.jpg'}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div>
          <div className={classes.heading}>
            <h1>About Me</h1>
            <h3>FULL STACK DEVELOPER</h3>
          </div>

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

      <section id='resume'>
        <h1>Resume</h1>
        <div>
          <h2>CyposSystems</h2>
          <p>Software Developer</p>
          <p>2019 - 2022</p>
        </div>
        <div>
          <h2>Amdocs</h2>
          <p>Software Developer</p>
          <p>2022 - Present</p>
        </div>
      </section>

      <section id='skills'>
        <h1>Skills</h1>
        <div>
          <h2>Frontend</h2>
          <ul>
            <li>JavaScript: 95%</li>
            <li>React: 95%</li>
            <li>CSS: 95%</li>
            <li>Android Studio: 20%</li>
          </ul>
        </div>
        <div>
          <h2>Backend</h2>
          <ul>
            <li>Node.js: 70%</li>
            <li>Java Spring: 25%</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
