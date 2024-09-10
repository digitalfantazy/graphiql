import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerWrapper}>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
            className={`${styles.footerLink} ${styles.rsLink}`}
          >
            <Image
              src="/images/rss-logo.svg"
              className={styles.footerLogo}
              alt="Rolling Scopes School logo"
              width={24}
              height={24}
            />
            <span>RS School</span>
          </a>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/koshman-dmitri"
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              <Image
                src="/images/github-logo.svg"
                className={styles.footerLogo}
                alt="GitHub logo"
                width={24}
                height={24}
              />
              <span>koshman-dmitri</span>
            </a>
            <a
              href="https://github.com/digitalfantazy"
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              <Image
                src="/images/github-logo.svg"
                className={styles.footerLogo}
                alt="GitHub logo"
                width={24}
                height={24}
              />
              <span>digitalfantazy</span>
            </a>
            <a
              href="https://github.com/LiudmilaRodzina"
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              <Image
                src="/images/github-logo.svg"
                className={styles.footerLogo}
                alt="GitHub logo"
                width={24}
                height={24}
              />
              <span>liudmilarodzina</span>
            </a>
          </div>
          <span className={styles.footerCopy}>&copy; 2024</span>
        </div>
      </div>
    </footer>
  );
}
