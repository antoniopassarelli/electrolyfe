import type { ChemicalElement, Ingredient } from '@/app/types';
import { getLocalizedIngredientName, getScreenType } from '@/app/utils';

import styles from './IngredientDropdown.module.css';

interface IngredientDropdownProps {
    ingredientList: Ingredient[];
    selectedIngredient: Ingredient;
    elementKey: ChemicalElement;
    onSelectIngredient: (element: ChemicalElement, ingredient: Ingredient) => void;
    onAddNewIngredient: (element: ChemicalElement) => void;
}

export default function IngredientDropdown({
                                               ingredientList,
                                               selectedIngredient,
                                               elementKey,
                                               onSelectIngredient,
                                               onAddNewIngredient,
                                           }: IngredientDropdownProps) {
    const handleChange = (value: string) => {
        if (value === 'ADD_NEW') {
            onAddNewIngredient(elementKey);
            return;
        }

        const found = ingredientList.find((i) => i.name === value);
        if (found) {
            onSelectIngredient(elementKey, found);
        }
    };

    const screenType = getScreenType();
    const fontSize =
        screenType === 'desktop' ? 18 : screenType === 'tablet' ? 16 : 14;

    return (
        <div className={styles.container}>
            <select
                className={styles.dropdown}
                style={{ fontSize }}
                value={selectedIngredient?.name ?? ''}
                onChange={(e) => handleChange(e.target.value)}
            >
                {ingredientList.map((ing) => (
                    <option key={ing.name} value={ing.name}>
                        {getLocalizedIngredientName(ing)}
                    </option>
                ))}

                <option value="ADD_NEW">➕ Add New</option>
            </select>
        </div>
    );
}
