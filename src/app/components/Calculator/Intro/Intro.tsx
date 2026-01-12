import { useNavigate } from 'react-router-dom';

import Container from '@/app/components/Container/Container';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import IntroSection from '@/app/components/Calculator/Intro/IntroSection';
import i18n from '@/app/i18n';

import styles from './Intro.module.css';

export default function Intro() {
    const navigate = useNavigate();

    return (
        <Container>
            <Header
                title={i18n.translate('intro.title')}
                showBackButton
                rightComponent={
                    <button
                        type="button"
                        className={styles.homeButton}
                        onClick={() => navigate('/')}
                    >
                        🏠
                    </button>
                }
            />

            <div className={styles.scrollContainer}>
                <IntroSection />
            </div>

            <Footer />
        </Container>
    );
}
