import {useState} from 'react';

import TargetSelector from '@/app/components/Calculator/TargetSelector/TargetSelector';
import TargetInput from '@/app/components/Calculator/TargetInput/TargetInput';
import UnitSelector from '@/app/components/Calculator/UnitSelector/UnitSelector';
import IngredientsOutput from '@/app/components/Calculator/Ingredients/IngredientsOutput';

import type {Ingredient, UnitType} from '@/app/types';
import {ChemicalElement} from '@/app/types';
import {calculateAmounts, getProfileFromDI} from '@/app/utils';

import styles from '@/app/components/Calculator/Calculator.module.css';
import useIngredientContext from "@/app/Context/useIngredientContext.ts";

export default function Calculator() {
    const {
        calculatorInputValue,
        setCalculatorInputValue,
        calculatorTargetType,
        setCalculatorTargetType,
        selectedIngredients,
        setSelectedIngredient,
        depletionIndex,
        ingredients: mergedIngredients,
    } = useIngredientContext();

    const [selectedUnit, setSelectedUnit] = useState<UnitType>('g');

    const numericVal = Number(calculatorInputValue);
    const isInputValid = numericVal > 0 && Number.isInteger(numericVal);

    const baseQuantityPerServing = getProfileFromDI(depletionIndex);

    const amounts = isInputValid
        ? calculateAmounts(
            calculatorTargetType,
            numericVal,
            selectedIngredients,
            baseQuantityPerServing,
            selectedUnit
        )
        : {
            [ChemicalElement.Sodium]: {amount: 0, unit: selectedUnit},
            [ChemicalElement.Potassium]: {amount: 0, unit: selectedUnit},
            [ChemicalElement.Magnesium]: {amount: 0, unit: selectedUnit},
        };

    return (
        <div className={styles.container}>
            <div className={styles.scrollableContent}>
                <div className={styles.topSection}>
                    <TargetSelector
                        activeTarget={calculatorTargetType}
                        onChange={setCalculatorTargetType}
                    />
                    <TargetInput
                        targetType={calculatorTargetType}
                        value={calculatorInputValue}
                        onChange={setCalculatorInputValue}
                        unit={selectedUnit}
                    />
                    <UnitSelector
                        selectedUnit={selectedUnit}
                        onSelectUnit={setSelectedUnit}
                    />
                </div>

                <div className={styles.bottomSection}>
                    <IngredientsOutput
                        ingredientsMap={mergedIngredients}
                        amounts={amounts}
                        unit={selectedUnit}
                        selectedIngredients={selectedIngredients}
                        onSelectIngredient={(element: ChemicalElement, ing: Ingredient) =>
                            setSelectedIngredient(element, ing)
                        }
                    />
                </div>
            </div>
        </div>
    );
}
