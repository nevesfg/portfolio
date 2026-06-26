'use client';

import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import ProjectsStats from './components/ProjectsStats';
import ProfileSidebar from './components/ProfileSidebar';
import Comments from './components/Comments';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.responsivePageFrame}>
      <AnimatedBackground />
      <Header />

      <div className={styles.responsivePageContent}>
        <div className={styles.profilePage}>
          <ProfileHeader />

          <div className={styles.profileContent}>
            <div className={styles.profileContentInner}>
              <div className={styles.fullWidthSection}>
                <div id="sobre">
                  <AboutMe />
                </div>
                <div id="habilidades">
                  <Skills />
                </div>
                <div id="projetos">
                  <ProjectsStats />
                </div>
              </div>

              <div className={styles.profileMainContent}>
                <div className={styles.profileLeftcol} id="comentarios">
                  <Comments />
                </div>

                <ProfileSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}