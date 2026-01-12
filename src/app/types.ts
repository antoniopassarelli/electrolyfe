export type UnitType = 'mg' | 'g' | 'dag' | 'hg' | 'kg';
export type TargetType = 'NumberOfServings' | 'TotalWeight';
export type DepletionIndex = number;

export const ChemicalElement = {
    Sodium: 'sodium',
    Potassium: 'potassium',
    Magnesium: 'magnesium',
} as const;

export type ChemicalElement =
    (typeof ChemicalElement)[keyof typeof ChemicalElement];

export interface ElementServing {
    amount: number;
    unit: UnitType;
}

export type ElementBaseQuantityPerServing = Record<
    ChemicalElement,
    ElementServing
>;

export interface Ingredient {
    name: string;
    percentage: number;
    isDefault: boolean;
}

export type IngredientsMap = {
    [ChemicalElement.Sodium]: Ingredient[];
    [ChemicalElement.Potassium]: Ingredient[];
    [ChemicalElement.Magnesium]: Ingredient[];
};
