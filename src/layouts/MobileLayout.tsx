import { useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import CalculatorPage from '@/app/components/Calculator/CalculatorPage';

export default function MobileLayout() {
    const navigate = useNavigate();

    return (
        <AppLayout
            rightIcon="⚙️"
            rightIconOnPress={() => navigate('/settingsPage')}
        >
            <CalculatorPage />
        </AppLayout>
    );
}
