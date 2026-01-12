import React from 'react';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import Container from '@/app/components/Container/Container';

type Props = {
    showBackButton?: boolean;
    headerTitle?: string;
    leftImageUri?: string;
    rightIcon?: string;
    rightIconOnPress?: () => void;
    children: React.ReactNode;
};

export default function AppLayout({
                                      showBackButton = false,
                                      headerTitle = 'ElectroLyfe',
                                      leftImageUri,
                                      rightIcon,
                                      rightIconOnPress,
                                      children,
                                  }: Props) {
    return (
        <Container>
            <Header
                title={headerTitle}
                showBackButton={showBackButton}
                leftImageUri={leftImageUri}
                rightComponent={
                    rightIconOnPress ? (
                        <button onClick={rightIconOnPress}>{rightIcon}</button>
                    ) : null
                }
            />
            <main className="main-content">{children}</main>
            <Footer />
        </Container>
    );
}
