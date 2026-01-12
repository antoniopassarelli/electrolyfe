import { useNavigate } from 'react-router-dom';

import useIngredientContext from '@/app/Context/useIngredientContext';
import i18n from '@/app/i18n';
import { getScreenType } from '@/app/utils';

import CustomSlider from '@/app/components/Calculator/Settings/components/CustomSlider';
import ElementRatioPanel from '@/app/components/Calculator/Settings/components/ElementRatioPanel';

import styles from './SettingsController.module.css';

export default function SettingsController() {
    const navigate = useNavigate();
    const { depletionIndex, setDepletionIndex } = useIngredientContext();

    const handleSave = () => {
        navigate('/');
    };

    const handleReset = () => {
        setDepletionIndex(50);
    };

    const isMobile = getScreenType() === 'mobile';

    return (
        <div className={styles.container}>
            <div>
                <CustomSlider
                    label={i18n.translate('settingsPage.depletionIndexLabel')}
                    min={0}
                    max={100}
                    value={depletionIndex}
                    onChange={setDepletionIndex}
                />

                {isMobile && (
                    <div className={styles.actionButtons}>
                        <button
                            type="button"
                            className={styles.primaryButton}
                            onClick={handleSave}
                        >
                            {i18n.translate('save')}
                        </button>

                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={handleReset}
                        >
                            {i18n.translate('resetToDefaults')}
                        </button>
                    </div>
                )}
            </div>

            <ElementRatioPanel />
        </div>
    );
}
