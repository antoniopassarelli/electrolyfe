import AppLayout from './AppLayout';
import Calculator from '@/app/components/Calculator/Calculator';
import Settings from '@/app/components/Calculator/Settings/Settings';
import IntroSection from '@/app/components/Calculator/Intro/IntroSection';
import Column from '@/app/components/ColumnLayout';
import i18n from '@/app/i18n';

export default function DesktopLayout() {
    return (
        <AppLayout>
            <div className="row-container">
                <Column className="calculatorColumn">
                    <h2 className="columnTitle">{i18n.translate('calculatorTitle')}</h2>
                    <Calculator />
                </Column>
                <Column className="settingsColumn">
                    <h2 className="columnTitle">{i18n.translate('settings')}</h2>
                    <Settings />
                </Column>
                <Column className="infoColumn">
                    <IntroSection />
                </Column>
            </div>
        </AppLayout>
    );
}
