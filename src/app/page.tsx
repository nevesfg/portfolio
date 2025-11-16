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
import { useScrollModal } from './hooks/useScrollModal';
import styles from './page.module.css';

export default function Home() {
  const activeModal = useScrollModal();
  return (
    <div className={styles.responsivePageFrame}>
      <AnimatedBackground />
      <Header />
      
      {/* Modal Overlay */}
      <div className={`modal-overlay ${activeModal ? 'active' : ''}`}></div>
      
      <div className={styles.responsivePageContent}>
        <div className={styles.profilePage}>
          <ProfileHeader />
          
          <div className={styles.profileContent}>
            <div className={styles.profileContentInner}>
              <div className={styles.fullWidthSection}>
                <div 
                  id="sobre" 
                  className={`scroll-section ${activeModal === 'sobre' ? 'modal-active' : ''}`}
                >
                  <AboutMe />
                </div>
                <div 
                  id="habilidades" 
                  className={`scroll-section ${activeModal === 'habilidades' ? 'modal-active' : ''}`}
                >
                  <Skills />
                </div>
                <div 
                  id="projetos" 
                  className={`scroll-section ${activeModal === 'projetos' ? 'modal-active' : ''}`}
                >
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