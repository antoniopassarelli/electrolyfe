import { useContext } from 'react';
import type { IngredientContextType } from '@/app/constants';
import IngredientContext from '@/app/Context/IngredientContext';

export default function useIngredientContext(): IngredientContextType {
    return useContext(IngredientContext);
}
