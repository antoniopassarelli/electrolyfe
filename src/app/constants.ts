import {
    ChemicalElement,
    type ElementBaseQuantityPerServing,
    type Ingredient,
    type IngredientsMap,
    type TargetType,
    type UnitType,
} from './types';

export const defaultIngredients: IngredientsMap = {
    [ChemicalElement.Sodium]: [
        {name: 'pinkSalt', percentage: 0.40, isDefault: true},
        {name: 'tableSalt', percentage: 0.394, isDefault: true},
        {name: 'seaSalt', percentage: 0.394, isDefault: true},
        {name: 'himalayanSalt', percentage: 0.392, isDefault: true},
    ],
    [ChemicalElement.Potassium]: [
        {name: 'potassiumChloride', percentage: 0.524, isDefault: true},
        {name: 'potassiumBicarbonate', percentage: 0.391, isDefault: true},
        {name: 'potassiumCitrate', percentage: 0.383, isDefault: true},
    ],
    [ChemicalElement.Magnesium]: [
        {name: 'magnesiumOxide', percentage: 0.603, isDefault: true},
        {name: 'magnesiumCitrate', percentage: 0.162, isDefault: true},
        {name: 'magnesiumBisglycinate', percentage: 0.180, isDefault: true},
        {name: 'magnesiumMalate', percentage: 0.154, isDefault: true},
    ],
};

export const ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG: ElementBaseQuantityPerServing = {
    [ChemicalElement.Sodium]: {amount: 1000, unit: 'mg'},
    [ChemicalElement.Potassium]: {amount: 200, unit: 'mg'},
    [ChemicalElement.Magnesium]: {amount: 60, unit: 'mg'},
};

export const WHO_QUANTITIES_PER_DOSE_IN_MG: ElementBaseQuantityPerServing = {
    [ChemicalElement.Sodium]: {amount: 431, unit: 'mg'},
    [ChemicalElement.Potassium]: {amount: 756, unit: 'mg'},
    [ChemicalElement.Magnesium]: {amount: 73, unit: 'mg'},
};

// A simple conversion map from the chosen unit to mg.
export const unitToMg: Record<UnitType, number> = {
    mg: 1,
    g: 1000,
    dag: 10000,
    hg: 100000,
    kg: 1000000,
};

export const allUnits: UnitType[] = ['mg', 'g', 'dag', 'hg', 'kg'];

/**
 * In-app ephemeral states for the Calculator:
 * - calculatorInputValue: user’s numeric input (as string)
 * - calculatorTargetType: 'NumberOfServings' or 'TotalWeight'
 * - selectedIngredients: which ingredient is chosen for each element
 */
export interface IngredientContextType {
    // Persisted across sessions
    ingredients: IngredientsMap;
    baseQuantityPerServing: ElementBaseQuantityPerServing;
    isBannerVisible: boolean;

    depletionIndex: number;
    setDepletionIndex: (di: number) => void;

    // Ephemeral, memory-only for the Calculator
    calculatorInputValue: string;
    calculatorTargetType: TargetType;
    selectedIngredients: {
        [ChemicalElement.Sodium]: Ingredient;
        [ChemicalElement.Potassium]: Ingredient;
        [ChemicalElement.Magnesium]: Ingredient;
    };

    // Methods for base values + banner
    updateBaseValuesState: (newValues: ElementBaseQuantityPerServing) => void;
    addIngredient: (element: ChemicalElement, ingredient: Ingredient) => void;
    saveBaseValuesToStorage: (localBaseValues: ElementBaseQuantityPerServing) => Promise<void>;
    saveIngredientsToStorage: () => Promise<void>;
    resetBaseValues: () => Promise<void>;
    resetIngredients: () => Promise<void>;
    setBannerVisibility: (visible: boolean) => Promise<void>;

    // Methods for ephemeral Calculator data
    setCalculatorInputValue: (value: string) => void;
    setCalculatorTargetType: (value: TargetType) => void;
    setSelectedIngredient: (element: ChemicalElement, ingredient: Ingredient) => void;
}

/**
 * Data structure persisted in AsyncStorage
 */
export interface CalculatorData {
    baseQuantityPerServing: ElementBaseQuantityPerServing;
    ingredients: IngredientsMap;
    isBannerVisible: boolean;
}

export const defaultContextValue: IngredientContextType = {
    ingredients: defaultIngredients,
    baseQuantityPerServing: ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG,
    isBannerVisible: true,
    depletionIndex: 50,

    // Ephemeral defaults
    calculatorInputValue: '',
    calculatorTargetType: 'NumberOfServings',
    selectedIngredients: {
        [ChemicalElement.Sodium]: defaultIngredients[ChemicalElement.Sodium][0],
        [ChemicalElement.Potassium]: defaultIngredients[ChemicalElement.Potassium][0],
        [ChemicalElement.Magnesium]: defaultIngredients[ChemicalElement.Magnesium][0],
    },

    updateBaseValuesState: () => {
        throw new Error('updateBaseValuesState is not initialized');
    },
    addIngredient: () => {
        throw new Error('addIngredient is not initialized');
    },
    saveBaseValuesToStorage: async () => {
        throw new Error('saveBaseValuesToStorage is not initialized');
    },
    saveIngredientsToStorage: async () => {
        throw new Error('saveIngredientsToStorage is not initialized');
    },
    resetBaseValues: async () => {
        throw new Error('resetBaseValues is not initialized');
    },
    resetIngredients: async () => {
        throw new Error('resetIngredients is not initialized');
    },
    setBannerVisibility: async () => {
        throw new Error('setBannerVisibility is not initialized');
    },

    setCalculatorInputValue: () => {
        throw new Error('setCalculatorInputValue is not initialized');
    },
    setCalculatorTargetType: () => {
        throw new Error('setCalculatorTargetType is not initialized');
    },
    setSelectedIngredient: () => {
        throw new Error('setSelectedIngredient is not initialized');
    },
    setDepletionIndex: () => {
        throw new Error('setDepletionIndex is not initialized');
    },
};

export const DEVICE_TYPES = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
};

export const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
};

export default {
    defaultIngredients,
    ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG,
    WHO_QUANTITIES_PER_DOSE_IN_MG,
    unitToMg,
    allUnits,
    defaultContextValue,
    DEVICE_TYPES,
    BREAKPOINTS,
};
