import { Routes, Route } from 'react-router-dom';
import { getScreenType } from '@/app/utils';
import { DEVICE_TYPES } from '@/app/constants';

import MobileLayout from '@/layouts/MobileLayout';
import TabletLayout from '@/layouts/TabletLayout';
import DesktopLayout from '@/layouts/DesktopLayout';
import IntroPage from '@/app/introPage';
import SettingsPage from '@/app/settingsPage';

function LayoutSwitch() {
    const screenType = getScreenType();

    switch (screenType) {
        case DEVICE_TYPES.TABLET:
            return <TabletLayout />;
        case DEVICE_TYPES.DESKTOP:
            return <DesktopLayout />;
        case DEVICE_TYPES.MOBILE:
        default:
            return <MobileLayout />;
    }
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LayoutSwitch />} />
            <Route path="/introPage" element={<IntroPage />} />
            <Route path="/settingsPage" element={<SettingsPage />} />
            <Route path="*" element={<LayoutSwitch />} />
        </Routes>
    );
}
