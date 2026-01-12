import styles from './ElementRatioBar.module.css';

type Props = {
    label: string;
    percentage: number;
    color: string;
};

export default function ElementRatioBar({ label, percentage, color }: Props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{label}</div>

            <div className={styles.outer}>
                <div
                    className={styles.inner}
                    style={{ height: `${percentage}%`, backgroundColor: color }}
                />
            </div>

            <div className={styles.value}>{percentage.toFixed(1)}%</div>
        </div>
    );
}
