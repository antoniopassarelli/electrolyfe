import { useState } from 'react';
import type { Ingredient } from '@/app/types';
import i18n from '@/app/i18n';
import styles from './AddIngredientForm.module.css';

interface AddIngredientFormProps {
    // element: ChemicalElement;
    onSave: (ingredient: Ingredient) => void;
    onCancel: () => void;
}

export default function AddIngredientForm({
                                              // element,
                                              onSave,
                                              onCancel,
                                          }: AddIngredientFormProps) {
    const [name, setName] = useState('');
    const [percentageInput, setPercentageInput] = useState('');
    const [nameFocused, setNameFocused] = useState(false);
    const [percentageFocused, setPercentageFocused] = useState(false);

    const handlePercentageChange = (value: string) => {
        const digits = value.replace(/[^0-9]/g, '');
        if (digits === '') {
            setPercentageInput('');
            return;
        }
        const parsed = parseInt(digits, 10);
        if (!Number.isNaN(parsed) && parsed <= 100) {
            setPercentageInput(digits);
        }
    };

    const isFormValid = () => {
        const parsed = parseInt(percentageInput, 10);
        return (
            name.trim() !== '' &&
            !Number.isNaN(parsed) &&
            parsed > 0 &&
            parsed <= 100
        );
    };

    const handleSave = () => {
        const parsed = parseInt(percentageInput, 10);
        const ingredient: Ingredient = {
            name: name.trim(),
            percentage: parsed / 100,
            isDefault: false,
        };
        onSave(ingredient);
    };

    return (
        <div className={styles.formContainer}>
            <input
                className={styles.input}
                value={name}
                placeholder={
                    nameFocused
                        ? ''
                        : i18n.translate('addIngredient.ingredientNamePlaceholder')
                }
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
            />

            <input
                className={styles.input}
                value={percentageInput}
                placeholder={percentageFocused ? '' : '0 to 100'}
                inputMode="numeric"
                maxLength={3}
                onChange={(e) => handlePercentageChange(e.target.value)}
                onFocus={() => setPercentageFocused(true)}
                onBlur={() => setPercentageFocused(false)}
            />

            <div className={styles.buttonRow}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={onCancel}
                >
                    {i18n.translate('addIngredient.cancel')}
                </button>

                <button
                    type="button"
                    className={`${styles.saveButton} ${
                        !isFormValid() ? styles.disabledButton : ''
                    }`}
                    onClick={handleSave}
                    disabled={!isFormValid()}
                >
                    {i18n.translate('addIngredient.save')}
                </button>
            </div>
        </div>
    );
}
