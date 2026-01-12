import React from 'react';
import styles from './Column.module.css';

type ColumnProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

const Column: React.FC<ColumnProps> = ({ children, className, style }) => {
    return (
        <div
            className={`${styles.column}${className ? ` ${className}` : ''}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default Column;
