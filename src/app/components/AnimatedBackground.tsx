import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
  return (
     <div className={styles.profileAnimatedBackground}>
      <img 
        src="/assets/background.jpg" 
        alt="Background"
        className={styles.backgroundVideo}
      />
    </div>
    // <div className={styles.profileAnimatedBackground}>
    //   <video 
    //     playsInline 
    //     autoPlay 
    //     muted 
    //     loop 
    //     className={styles.backgroundVideo}
    //   >
    //     <source src="/assets/bg-test.webm" type="video/webm" />
    //   </video>
    // </div>
  );
}