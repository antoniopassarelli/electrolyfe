import { useState } from 'react';
import i18n from '@/app/i18n';
import styles from './TargetInput.module.css';

type TargetType = 'TotalWeight' | 'NumberOfServings';

interface TargetInputProps {
    targetType: TargetType;
    value: string;
    unit: string;
    onChange: (value: string) => void;
}

export default function TargetInput({
                                        targetType,
                                        value,
                                        unit,
                                        onChange,
                                    }: TargetInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const labelText =
        targetType === 'TotalWeight'
            ? `${i18n.translate('enterTotalWeight')} (${unit})`
            : i18n.translate('enterNumberOfServings');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
        onChange(digitsOnly);
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (value === '0') onChange('');
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (value === '') onChange('0');
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>{labelText}</label>

            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    inputMode="numeric"
                    aria-label={labelText}
                    placeholder={isFocused ? '' : '0'}
                    maxLength={10}
                />
            </div>
        </div>
    );
}
