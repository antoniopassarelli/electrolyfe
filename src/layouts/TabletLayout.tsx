import { useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import Calculator from '@/app/components/Calculator/Calculator';
import Settings from '@/app/components/Calculator/Settings/Settings';
import Column from '@/app/components/ColumnLayout';
import i18n from '@/app/i18n';

export default function TabletLayout() {
    const navigate = useNavigate();

    return (
        <AppLayout
            rightIcon="ℹ️"
            rightIconOnPress={() => navigate('/introPage')}
        >
            <div className="row-container">
                <Column>
                    <h2 className="columnTitle">{i18n.translate('calculatorTitle')}</h2>
                    <Calculator />
                </Column>
                <Column className="settingsColumn">
                    <h2 className="columnTitle">{i18n.translate('settings')}</h2>
                    <Settings />
                </Column>
            </div>
        </AppLayout>
    );
}
