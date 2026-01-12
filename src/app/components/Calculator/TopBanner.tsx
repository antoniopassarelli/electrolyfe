import { useNavigate } from 'react-router-dom';

import i18n from '@/app/i18n';
import useIngredientContext from '@/app/Context/useIngredientContext';

import styles from './TopBanner.module.css';

export default function TopBanner() {
    const navigate = useNavigate();
    const { setBannerVisibility } = useIngredientContext();

    const handleDismiss = () => {
        setBannerVisibility(false);
    };

    const handleStartHere = () => {
        navigate('/introPage');
    };

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.mainContent}>
        <span className={styles.bannerHeadline}>
          {i18n.translate('intro.startHereMessage')}
        </span>
            </div>

            <button
                type="button"
                className={styles.ctaButton}
                onClick={handleStartHere}
            >
                {i18n.translate('intro.startButtonText')}
            </button>

            <button
                type="button"
                className={styles.closeButton}
                onClick={handleDismiss}
                aria-label="Dismiss"
            >
                ×
            </button>
        </div>
    );
}
