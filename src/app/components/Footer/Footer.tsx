import { getScreenType } from '@/app/utils';
import styles from './Footer.module.css';

interface FooterProps {
    text?: string;
}

export default function Footer({ text }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const defaultText = `© ${currentYear} ElectroLyfe`;
    const screenType = getScreenType();

    const paddingVertical =
        screenType === 'desktop' ? '0.75%' : '1.7%';

    return (
        <footer
            className={styles.footer}
            style={{ paddingTop: paddingVertical, paddingBottom: paddingVertical }}
            aria-label="Footer"
        >
      <span className={styles.footerText}>
        {text || defaultText}
      </span>
        </footer>
    );
}
