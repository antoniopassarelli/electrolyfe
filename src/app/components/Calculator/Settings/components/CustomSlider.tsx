import styles from './CustomSlider.module.css';

type CustomSliderProps = {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
};

export default function CustomSlider({
                                         label,
                                         min,
                                         max,
                                         value,
                                         onChange,
                                     }: CustomSliderProps) {
    const decrease = () => onChange(value > min ? value - 1 : min);
    const increase = () => onChange(value < max ? value + 1 : max);

    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.currentValue}>{value}</div>

            <div className={styles.row}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={decrease}
                    aria-label="Decrease"
                >
                    −
                </button>

                <input
                    className={styles.slider}
                    type="range"
                    min={min}
                    max={max}
                    step={1}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />

                <button
                    type="button"
                    className={styles.button}
                    onClick={increase}
                    aria-label="Increase"
                >
                    +
                </button>
            </div>

            <div className={styles.endLabels}>
                <span className={styles.endLabel}>{min}</span>
                <span className={styles.endLabel}>{max}</span>
            </div>
        </div>
    );
}
