import { createContext } from 'react';
import { defaultContextValue, type IngredientContextType } from '@/app/constants';

const IngredientContext = createContext<IngredientContextType>(defaultContextValue);

export default IngredientContext;
