import { getScreenType } from '@/app/utils';
import styles from './IngredientUnitOutput.module.css';

interface IngredientBlockProps {
    quantity: string;
    unit?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
}

export default function IngredientUnitOutput({
                                                 quantity,
                                                 unit,
                                                 backgroundColor = 'var(--blue-bright-5)',
                                                 borderColor = 'var(--blue-accent)',
                                                 textColor = 'var(--neutral-white)',
                                             }: IngredientBlockProps) {
    const screenType = getScreenType();
    const fontSize =
        screenType === 'desktop' ? 18 : screenType === 'tablet' ? 16 : 14;

    const outputString = unit ? `${quantity} ${unit}` : quantity;

    return (
        <div className={styles.block}>
            <div
                className={styles.quantityContainer}
                style={{ backgroundColor, borderColor }}
            >
        <span
            className={styles.quantityText}
            style={{ fontSize, color: textColor }}
        >
          {outputString}
        </span>
            </div>
        </div>
    );
}
