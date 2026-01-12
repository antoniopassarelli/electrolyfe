import { useState } from 'react';

import type { ChemicalElement, Ingredient, UnitType } from '@/app/types';
import { getLocalizedElementLabel } from '@/app/utils';
import useIngredientContext from '@/app/Context/useIngredientContext';

import IngredientDropdown from '@/app/components/Calculator/Ingredients/AddIngredient/IngredientDropdown';
import IngredientUnitOutput from '@/app/components/Calculator/Ingredients/IngredientUnitOutput';
import AddIngredientForm from '@/app/components/Calculator/Ingredients/AddIngredient/AddIngredientForm';

import styles from './IngredientCard.module.css';

interface IngredientCardProps {
    elementKey: ChemicalElement;
    ingredientList: Ingredient[];
    selectedIngredient: Ingredient;
    quantity: string;
    unit: UnitType;
    onSelectIngredient: (element: ChemicalElement, ingredient: Ingredient) => void;
}

export default function IngredientCard({
                                           elementKey,
                                           ingredientList,
                                           selectedIngredient,
                                           quantity,
                                           unit,
                                           onSelectIngredient,
                                       }: IngredientCardProps) {
    const { addIngredient } = useIngredientContext();
    const [showAddForm, setShowAddForm] = useState(false);

    // const screenType = getScreenType();
    // const fontSize =
    //     screenType === 'desktop' ? 20 : screenType === 'tablet' ? 16 : 14;

    const handleAddNewIngredientClick = () => {
        setShowAddForm(true);
    };

    const handleSaveNewIngredient = (newIngredient: Ingredient) => {
        addIngredient(elementKey, newIngredient);
        onSelectIngredient(elementKey, newIngredient);
        setShowAddForm(false);
    };

    const handleCancelNewIngredient = () => {
        setShowAddForm(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.folderTab}>
        <span className={styles.folderTabText}>
          {getLocalizedElementLabel(elementKey)}
        </span>
            </div>

            <div className={styles.card}>
                <div className={styles.cardContent}>
                    <IngredientDropdown
                        ingredientList={ingredientList}
                        selectedIngredient={selectedIngredient}
                        elementKey={elementKey}
                        onSelectIngredient={onSelectIngredient}
                        onAddNewIngredient={handleAddNewIngredientClick}
                    />

                    <div className={styles.bottomCardContainer}>
                        <div className={styles.percentageContainer}>
                            {selectedIngredient && (
                                <IngredientUnitOutput
                                    backgroundColor="var(--neutral-grey-dark)"
                                    textColor="var(--blue-dark-2)"
                                    quantity={`${(selectedIngredient.percentage * 100).toFixed(0)}%`}
                                />
                            )}
                        </div>

                        <div className={styles.quantityContainer}>
                            <IngredientUnitOutput
                                quantity={quantity}
                                unit={unit}
                                borderColor="var(--neutral-grey-darker)"
                                textColor="var(--neutral-grey-light)"
                                backgroundColor="var(--blue-dark-2)"
                            />
                        </div>
                    </div>
                </div>

                {showAddForm && (
                    <AddIngredientForm
                        // element={elementKey}
                        onSave={handleSaveNewIngredient}
                        onCancel={handleCancelNewIngredient}
                    />
                )}
            </div>
        </div>
    );
}
