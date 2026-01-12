import {
    ChemicalElement,
    type ElementBaseQuantityPerServing,
    type ElementServing,
    type Ingredient,
    type IngredientsMap,
    type TargetType,
    type UnitType
} from "@/app/types";
import {
    BREAKPOINTS,
    DEVICE_TYPES,
    ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG,
    unitToMg,
    WHO_QUANTITIES_PER_DOSE_IN_MG
} from "@/app/constants";
import i18n from "@/app/i18n";

export function needsIngredientFix(
    stored: IngredientsMap,
    updated: IngredientsMap
): boolean {
    for (const element of Object.keys(updated) as (keyof IngredientsMap)[]) {
        const storedList = stored[element] ?? [];
        const map = new Map(storedList.map(i => [i.name, i]));

        for (const def of updated[element]) {
            const current = map.get(def.name);
            if (!current || (current.isDefault && current.percentage !== def.percentage)) {
                return true;                // missing or stale
            }
        }
    }
    return false;
}

export function applyIngredientFix(
    stored: IngredientsMap,
    updated: IngredientsMap
): IngredientsMap {
    const result: IngredientsMap = { ...stored };

    (Object.keys(updated) as (keyof IngredientsMap)[]).forEach(element => {
        const list: Ingredient[] = [...(result[element] ?? [])];
        const byName = new Map(list.map(i => [i.name, i]));

        updated[element].forEach(def => {
            const current = byName.get(def.name);
            if (!current) {
                list.push({ ...def });                          // add missing default
            } else if (current.isDefault && current.percentage !== def.percentage) {
                const idx = list.findIndex(i => i.name === def.name);
                list[idx] = { ...def };                         // replace stale default
            }
        });

        result[element] = list;
    });

    return result;
}

export function calculateAmounts(
    targetType: TargetType,
    inputValue: number,
    selectedIngredients: Record<ChemicalElement, Ingredient>,
    baseQuantityPerServing: Record<ChemicalElement, ElementServing>,
    selectedUnit: UnitType
): Record<ChemicalElement, ElementServing> {
    // Convert baseQuantityPerServing to mg
    const sodiumAmount: number = baseQuantityPerServing[ChemicalElement.Sodium].amount; // 1000
    const potassiumAmount: number = baseQuantityPerServing[ChemicalElement.Potassium].amount; // 200
    const magnesiumAmount: number = baseQuantityPerServing[ChemicalElement.Magnesium].amount; // 60

    const sodiumUnitToMg: number = unitToMg[baseQuantityPerServing[ChemicalElement.Sodium].unit]; // ie:
    const potassiumUnitToMg: number = unitToMg[baseQuantityPerServing[ChemicalElement.Potassium].unit];
    const magnesiumUnitToMg: number = unitToMg[baseQuantityPerServing[ChemicalElement.Magnesium].unit];

    const baseInMg: Record<ChemicalElement, number> = {
        [ChemicalElement.Sodium]: sodiumAmount * sodiumUnitToMg,
        [ChemicalElement.Potassium]: potassiumAmount * potassiumUnitToMg,
        [ChemicalElement.Magnesium]: magnesiumAmount * magnesiumUnitToMg,
    };

    const result: Record<ChemicalElement, ElementServing> = {
        [ChemicalElement.Sodium]: {amount: 0, unit: selectedUnit},
        [ChemicalElement.Potassium]: {amount: 0, unit: selectedUnit},
        [ChemicalElement.Magnesium]: {amount: 0, unit: selectedUnit},
    };

    if (targetType === 'NumberOfServings') {
        // We know how many servings: inputValue
        for (const element of [ChemicalElement.Sodium, ChemicalElement.Potassium, ChemicalElement.Magnesium]) {
            const totalMgElement = baseInMg[element] * inputValue; // total mg of that electrolyte
            const percentage = selectedIngredients[element].percentage;
            const ingredientMg = totalMgElement / percentage;
            const ingredientInSelectedUnit = ingredientMg / unitToMg[selectedUnit];
            result[element] = {amount: ingredientInSelectedUnit, unit: selectedUnit};
        }
    } else {
        // targetType = 'TotalWeight'
        // inputValue now represents a total target weight in selectedUnit
        const totalWeightInMg = inputValue * unitToMg[selectedUnit];

        // Compute per-serving total weight in mg
        let perServingTotalWeightMg = 0;
        for (const element of [ChemicalElement.Sodium, ChemicalElement.Potassium, ChemicalElement.Magnesium]) {
            const percentage = selectedIngredients[element].percentage;
            // per-serving ingredient mg for this element
            const ingredientMgPerServing = baseInMg[element] / percentage;
            perServingTotalWeightMg += ingredientMgPerServing;
        }

        // Number of servings represented by this total weight
        const numberOfServings = totalWeightInMg / perServingTotalWeightMg;

        // Now compute each ingredient’s total amount
        for (const element of [ChemicalElement.Sodium, ChemicalElement.Potassium, ChemicalElement.Magnesium]) {
            const percentage = selectedIngredients[element].percentage;
            const totalMgElement = baseInMg[element] * numberOfServings;
            const ingredientMg = totalMgElement / percentage;
            const ingredientInSelectedUnit = ingredientMg / unitToMg[selectedUnit];
            result[element] = {amount: ingredientInSelectedUnit, unit: selectedUnit};
        }
    }

    return result;
}

/**
 * Localizes the name of an ingredient.
 * If the ingredient key is not found, it returns the key itself.
 */
export const getLocalizedIngredientName = (ingredient: Ingredient): string => {
    if (ingredient.isDefault) {
        return i18n.translate(`ingredients.${ingredient.name}`) || ingredient.name;
    }
    return ingredient.name;
};

/**
 * Localizes the label of a chemical element.
 */
export const getLocalizedElementLabel = (element: string): string => {
    return i18n.translate(`elements.${element}`) || element;
};

export function getScreenType() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= BREAKPOINTS.MOBILE) {
        return DEVICE_TYPES.MOBILE;
    } else if (screenWidth <= BREAKPOINTS.TABLET) {
        return DEVICE_TYPES.TABLET;
    } else {
        return DEVICE_TYPES.DESKTOP;
    }
}

export function getProfileFromDI(
    di: number
): ElementBaseQuantityPerServing {
    const who   = WHO_QUANTITIES_PER_DOSE_IN_MG
    const el    = ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG
    const t     = di / 100
    return {
        sodium: {
            amount: who[ChemicalElement.Sodium].amount * (1 - t)
                + el[ChemicalElement.Sodium].amount * t,
            unit: 'mg'
        },
        potassium: {
            amount: who[ChemicalElement.Potassium].amount * (1 - t)
                + el[ChemicalElement.Potassium].amount * t,
            unit: 'mg'
        },
        magnesium: {
            amount: who[ChemicalElement.Magnesium].amount * (1 - t)
                + el[ChemicalElement.Magnesium].amount * t,
            unit: 'mg'
        }
    }
}

export default {
    calculateAmounts,
    getLocalizedIngredientName,
    getLocalizedElementLabel,
    getScreenType,
    getProfileFromDI,
};
