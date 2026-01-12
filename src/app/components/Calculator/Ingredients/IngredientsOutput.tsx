import { memo } from 'react';

import type {
    ElementServing,
    Ingredient,
    IngredientsMap,
    UnitType,
} from '@/app/types';
import { ChemicalElement } from '@/app/types';

import IngredientCard from '@/app/components/Calculator/Ingredients/AddIngredient/IngredientCard';
import styles from './IngredientsOutput.module.css';

interface IngredientsOutputProps {
    ingredientsMap: IngredientsMap;
    amounts: Record<ChemicalElement, ElementServing>;
    unit: UnitType;
    selectedIngredients: Record<ChemicalElement, Ingredient>;
    onSelectIngredient: (element: ChemicalElement, ingredient: Ingredient) => void;
}

function IngredientsOutput({
                               ingredientsMap,
                               amounts,
                               unit,
                               selectedIngredients,
                               onSelectIngredient,
                           }: IngredientsOutputProps) {
    return (
        <div className={styles.container}>
            {Object.entries(ingredientsMap).map(([element, ingredientList]) => {
                const elementKey = element as ChemicalElement;
                const selectedIngredient = selectedIngredients[elementKey];
                const quantityDisplay = amounts[elementKey].amount.toFixed(2);

                return (
                    <IngredientCard
                        key={elementKey}
                        elementKey={elementKey}
                        ingredientList={ingredientList}
                        selectedIngredient={selectedIngredient}
                        quantity={quantityDisplay}
                        unit={unit}
                        onSelectIngredient={onSelectIngredient}
                    />
                );
            })}
        </div>
    );
}

export default memo(IngredientsOutput);
