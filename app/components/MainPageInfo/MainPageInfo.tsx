import { useTranslation } from 'react-i18next';
import styles from './MainPageInfo.module.css';

export default function MainPageInfo() {
  const { t } = useTranslation('main');

  return (
    <div className={styles.contentContainer}>
      <div className={styles.sectionBox}>
        <h4 className={styles.sectionTitle}>{t('title_project')}</h4>
        <p className={styles.paragraph}>
          {t('project_intro')}{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
            className={styles.infoLink}
          >
            <span className={styles.bold}>{t('course_name')}</span>
          </a>
        </p>
        <p>
          {t('app_description_intro')}
          <span className={styles.bold}>REST</span>
          {t('and')} <span className={styles.bold}>GraphQL</span>. {t('app_description_outro')}
        </p>
      </div>

      <div className={styles.sectionBox}>
        <h4 className={styles.sectionTitle}>{t('title_technologies')}</h4>
        <p className={styles.paragraph}>
          React 18, Next.js 14, TypeScript, Firebase, i18next, Vitest, Husky, ESLint, Prettier
        </p>
      </div>

      <div className={styles.sectionBox}>
        <h4 className={styles.sectionTitle}>{t('title_team')}</h4>
        <ul className={styles.teamList}>
          <li>
            <span className={styles.bold}>{t('team_lead')}:</span>{' '}
            <a
              href="https://github.com/koshman-dmitri"
              target="_blank"
              rel="noreferrer"
              className={styles.infoLink}
            >
              koshman-dmitri
            </a>
          </li>
          <li>
            <span className={styles.bold}>{t('developers')}:</span>{' '}
            <a
              href="https://github.com/digitalfantazy"
              target="_blank"
              rel="noreferrer"
              className={styles.infoLink}
            >
              digitalfantazy
            </a>
            ,{' '}
            <a
              href="https://github.com/LiudmilaRodzina"
              target="_blank"
              rel="noreferrer"
              className={styles.infoLink}
            >
              liudmilarodzina
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
