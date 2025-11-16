'use client';

import { use } from 'react';
import Header from '../../components/Header';
import ProjectDetail from '../../components/ProjectDetail';
import AnimatedBackground from '../../components/AnimatedBackground';
import ScrollToTop from '../../components/ScrollToTop';
import styles from '../../page.module.css';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);
  
  return (
    <div className={styles.responsivePageFrame}>
      <AnimatedBackground />
      <Header />
      
      <div className={styles.responsivePageContent}>
        <div className={styles.profilePage}>
          <div className={styles.profileContent}>
            <div className={styles.profileContentInner}>
              <div className={styles.profileMainContent}>
                <div className={styles.profileLeftcol}>
                  <ProjectDetail projectId={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ScrollToTop />
    </div>
  );
}