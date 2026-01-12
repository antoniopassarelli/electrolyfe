import { useNavigate } from 'react-router-dom';
import { getScreenType } from '@/app/utils';
import styles from './Header.module.css';

interface HeaderProps {
    title: string;
    rightComponent?: React.ReactNode;
    showBackButton?: boolean;
    leftImageUri?: string;
}

export default function Header({
                                   title,
                                   rightComponent,
                                   showBackButton,
                                   leftImageUri = '/assets/images/header-icon.png',
                               }: HeaderProps) {
    const navigate = useNavigate();
    const screenType = getScreenType();

    const padding =
        screenType === 'desktop' ? '0.5%' : '1%';
    const marginBottom =
        screenType === 'desktop' ? '1%' : '1%';
    const imageWidth =
        screenType === 'desktop' ? '3%' : screenType === 'tablet' ? '5%' : '8%';

    return (
        <header
            className={styles.header}
            style={{
                padding,
                marginBottom,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            }}
        >
            {leftImageUri && (
                <img
                    src={leftImageUri}
                    alt="logo"
                    className={styles.image}
                    style={{ width: imageWidth }}
                />
            )}

            {showBackButton && (
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    ←
                </button>
            )}

            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{title}</h1>
            </div>

            {rightComponent && (
                <div className={styles.rightContainer}>{rightComponent}</div>
            )}
        </header>
    );
}
