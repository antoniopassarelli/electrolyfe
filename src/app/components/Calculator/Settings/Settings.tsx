import { useNavigate } from 'react-router-dom';
import i18n from '@/app/i18n';
import { getScreenType } from '@/app/utils';

import Container from '@/app/components/Container/Container';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import SettingsController from '@/app/components/Calculator/Settings/components/SettingsController';
import SettingsWarning from '@/app/components/Calculator/Settings/components/SettingsWarning';

import styles from './Settings.module.css';

export default function Settings() {
    const navigate = useNavigate();
    const screenType = getScreenType();
    const isMobile = screenType === 'mobile';

    return (
        <Container className={styles.container}>
            {isMobile && (
                <Header
                    title={i18n.translate('settings')}
                    showBackButton
                    rightComponent={
                        <button
                            type="button"
                            className={styles.infoButton}
                            onClick={() => navigate('/introPage')}
                        >
                            ℹ️
                        </button>
                    }
                />
            )}

            <div className={styles.wrapper}>
                <div className={styles.topContainer}>
                    <SettingsController />
                </div>

                <div className={styles.bottomContainer}>
                    <SettingsWarning />
                </div>
            </div>

            {isMobile && <Footer />}
        </Container>
    );
}
