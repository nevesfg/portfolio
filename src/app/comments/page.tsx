'use client';

import Header from '../components/Header';
import AllComments from '../components/AllComments';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollToTop from '../components/ScrollToTop';
import styles from '../page.module.css';

export default function CommentsPage() {
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
                  <AllComments />
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