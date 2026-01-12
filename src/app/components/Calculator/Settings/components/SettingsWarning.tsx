import i18n from '@/app/i18n';
import styles from './SettingsWarning.module.css';

export default function SettingsWarning() {
    return (
        <div className={styles.container}>
            <p className={styles.text}>
                {i18n.translate('settingsPage.desc1')}
            </p>
            <p className={styles.text}>
                {i18n.translate('settingsPage.desc2')}
            </p>
            <p className={styles.text}>
                {i18n.translate('settingsPage.desc3')}
            </p>
        </div>
    );
}
