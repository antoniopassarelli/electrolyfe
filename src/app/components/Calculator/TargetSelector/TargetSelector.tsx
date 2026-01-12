import i18n from '@/app/i18n';
import styles from './TargetSelector.module.css';

type TargetType = 'NumberOfServings' | 'TotalWeight';

interface TargetSelectorProps {
    activeTarget: TargetType;
    onChange: (target: TargetType) => void;
}

export default function TargetSelector({
                                           activeTarget,
                                           onChange,
                                       }: TargetSelectorProps) {
    return (
        <div className={styles.container}>
            <button
                type="button"
                className={`${styles.button} ${
                    activeTarget === 'NumberOfServings'
                        ? styles.activeButton
                        : styles.inactiveButton
                }`}
                onClick={() => onChange('NumberOfServings')}
            >
        <span
            className={`${styles.buttonText} ${
                activeTarget === 'NumberOfServings'
                    ? styles.activeText
                    : styles.inactiveText
            }`}
        >
          {i18n.translate('numberOfServingsLabel')}
        </span>
            </button>

            <button
                type="button"
                className={`${styles.button} ${
                    activeTarget === 'TotalWeight'
                        ? styles.activeButton
                        : styles.inactiveButton
                }`}
                onClick={() => onChange('TotalWeight')}
            >
        <span
            className={`${styles.buttonText} ${
                activeTarget === 'TotalWeight'
                    ? styles.activeText
                    : styles.inactiveText
            }`}
        >
          {i18n.translate('totalWeightLabel')}
        </span>
            </button>
        </div>
    );
}
