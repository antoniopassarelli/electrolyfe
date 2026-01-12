import useIngredientContext from '@/app/Context/useIngredientContext';
import { getProfileFromDI } from '@/app/utils';
import { ChemicalElement } from '@/app/types';

import ElementRatioBar from './ElementRatioBar';
import styles from './ElementRatioPanel.module.css';

export default function ElementRatioPanel() {
    const { depletionIndex } = useIngredientContext();
    const profile = getProfileFromDI(depletionIndex);

    const total =
        profile[ChemicalElement.Sodium].amount +
        profile[ChemicalElement.Potassium].amount +
        profile[ChemicalElement.Magnesium].amount;

    const sodiumPct = (profile[ChemicalElement.Sodium].amount / total) * 100;
    const potassiumPct = (profile[ChemicalElement.Potassium].amount / total) * 100;
    const magnesiumPct = (profile[ChemicalElement.Magnesium].amount / total) * 100;

    return (
        <div className={styles.row}>
            <ElementRatioBar label="Na" color="var(--blue-primary)" percentage={sodiumPct} />
            <ElementRatioBar label="K" color="var(--blue-bright-1)" percentage={potassiumPct} />
            <ElementRatioBar label="Mg" color="var(--blue-bright-6)" percentage={magnesiumPct} />
        </div>
    );
}
