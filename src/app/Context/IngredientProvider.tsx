import { useEffect, useState, type ReactNode } from 'react';

import {
    ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG,
    defaultContextValue,
    defaultIngredients,
    type CalculatorData,
    type IngredientContextType,
} from '@/app/constants';

import { ChemicalElement } from '@/app/types';
import type {
    ElementBaseQuantityPerServing,
    Ingredient,
    IngredientsMap,
} from '@/app/types';

import { applyIngredientFix, needsIngredientFix } from '@/app/utils';
import IngredientContext from '@/app/Context/IngredientContext';

const CALCULATOR_KEY = 'calculator';

export default function IngredientProvider({ children }: { children: ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);

    // persisted
    const [ingredients, setIngredients] = useState<IngredientsMap>(defaultIngredients);
    const [baseQuantityPerServing, setBaseQuantityPerServing] =
        useState<ElementBaseQuantityPerServing>(ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG);
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [depletionIndex, setDepletionIndex] = useState(50);

    // ephemeral
    const [calculatorInputValue, setCalculatorInputValue] =
        useState(defaultContextValue.calculatorInputValue);
    const [calculatorTargetType, setCalculatorTargetType] =
        useState(defaultContextValue.calculatorTargetType);
    const [selectedIngredients, setSelectedIngredients] =
        useState(defaultContextValue.selectedIngredients);

    const saveCalculatorToStorage = async (data: CalculatorData): Promise<void> => {
        const prevRaw = localStorage.getItem(CALCULATOR_KEY);
        const prev: CalculatorData = prevRaw
            ? JSON.parse(prevRaw)
            : {
                baseQuantityPerServing: ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG,
                ingredients: defaultIngredients,
                isBannerVisible: true,
            };

        const next: CalculatorData = {
            baseQuantityPerServing: data.baseQuantityPerServing ?? prev.baseQuantityPerServing,
            ingredients: data.ingredients ?? prev.ingredients,
            isBannerVisible: data.isBannerVisible ?? prev.isBannerVisible,
        };

        localStorage.setItem(CALCULATOR_KEY, JSON.stringify(next));
    };

    useEffect(() => {
        const hydrate = async () => {
            try {
                const raw = localStorage.getItem(CALCULATOR_KEY);
                if (!raw) return;

                const parsed: CalculatorData = JSON.parse(raw);

                if (parsed.baseQuantityPerServing) {
                    setBaseQuantityPerServing(parsed.baseQuantityPerServing);
                }

                if (parsed.ingredients) {
                    if (needsIngredientFix(parsed.ingredients, defaultIngredients)) {
                        const fixed = applyIngredientFix(parsed.ingredients, defaultIngredients);
                        setIngredients(fixed);
                        await saveCalculatorToStorage({
                            baseQuantityPerServing: parsed.baseQuantityPerServing ?? baseQuantityPerServing,
                            ingredients: fixed,
                            isBannerVisible: parsed.isBannerVisible ?? isBannerVisible,
                        });
                    } else {
                        setIngredients(parsed.ingredients);
                    }
                }

                if (parsed.isBannerVisible !== undefined) {
                    setIsBannerVisible(parsed.isBannerVisible);
                }
            } finally {
                setIsHydrated(true);
            }
        };

        hydrate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // exposed actions (Promise-returning to match IngredientContextType)
    const updateBaseValuesState: IngredientContextType['updateBaseValuesState'] = (values) => {
        setBaseQuantityPerServing(values);
        void saveCalculatorToStorage({ baseQuantityPerServing: values, ingredients, isBannerVisible });
    };

    const addIngredient: IngredientContextType['addIngredient'] = (element, ingredient) => {
        setIngredients(prev => {
            const updated = { ...prev, [element]: [...prev[element], ingredient] };
            void saveCalculatorToStorage({ baseQuantityPerServing, ingredients: updated, isBannerVisible });
            return updated;
        });
    };

    const saveBaseValuesToStorage: IngredientContextType['saveBaseValuesToStorage'] = async (localBase) => {
        await saveCalculatorToStorage({ baseQuantityPerServing: localBase, ingredients, isBannerVisible });
    };

    const saveIngredientsToStorage: IngredientContextType['saveIngredientsToStorage'] = async () => {
        await saveCalculatorToStorage({ baseQuantityPerServing, ingredients, isBannerVisible });
    };

    const resetBaseValues: IngredientContextType['resetBaseValues'] = async () => {
        setBaseQuantityPerServing(ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG);
        await saveCalculatorToStorage({
            baseQuantityPerServing: ELECTROLYFE_QUANTITIES_PER_DOSE_IN_MG,
            ingredients,
            isBannerVisible,
        });
    };

    const resetIngredients: IngredientContextType['resetIngredients'] = async () => {
        setIngredients(defaultIngredients);
        await saveCalculatorToStorage({
            baseQuantityPerServing,
            ingredients: defaultIngredients,
            isBannerVisible,
        });
    };

    const setBannerVisibility: IngredientContextType['setBannerVisibility'] = async (visible) => {
        setIsBannerVisible(visible);
        await saveCalculatorToStorage({
            baseQuantityPerServing,
            ingredients,
            isBannerVisible: visible,
        });
    };

    const setSelectedIngredient: IngredientContextType['setSelectedIngredient'] = (
        element: ChemicalElement,
        ing: Ingredient
    ) => {
        setSelectedIngredients(prev => ({ ...prev, [element]: ing }));
    };

    if (!isHydrated) return null;

    return (
        <IngredientContext.Provider
            value={{
                ingredients,
                baseQuantityPerServing,
                isBannerVisible,
                depletionIndex,
                setDepletionIndex,

                updateBaseValuesState,
                addIngredient,
                saveBaseValuesToStorage,
                saveIngredientsToStorage,
                resetBaseValues,
                resetIngredients,
                setBannerVisibility,

                calculatorInputValue,
                setCalculatorInputValue,
                calculatorTargetType,
                setCalculatorTargetType,
                selectedIngredients,
                setSelectedIngredient,
            }}
        >
            {children}
        </IngredientContext.Provider>
    );
}
