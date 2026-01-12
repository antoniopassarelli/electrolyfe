import type { UnitType } from '@/app/types';
import { allUnits } from '@/app/constants';

import styles from './UnitSelector.module.css';

interface UnitSelectorProps {
    selectedUnit: UnitType;
    onSelectUnit: (unit: UnitType) => void;
}

export default function UnitSelector({
                                         selectedUnit,
                                         onSelectUnit,
                                     }: UnitSelectorProps) {
    return (
        <div className={styles.container}>
            {allUnits.map((unit) => {
                const isActive = selectedUnit === unit;

                return (
                    <button
                        key={unit}
                        type="button"
                        className={`${styles.chip} ${isActive ? styles.activeChip : ''}`}
                        onClick={() => onSelectUnit(unit)}
                        aria-label={`Select unit: ${unit}`}
                    >
            <span
                className={`${styles.chipText} ${
                    isActive ? styles.activeChipText : ''
                }`}
            >
              {unit}
            </span>
                    </button>
                );
            })}
        </div>
    );
}
