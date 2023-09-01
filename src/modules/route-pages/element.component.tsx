import { Common } from '@modules/common';
import { Route, Routes } from 'react-router-dom';
import { ContactPage, CookiesPage, FaqPage, PrivacyPage } from './pages';

export const Element: React.FC = () => {
    return (
        <Routes>
            <Route path='contact' element={<ContactPage />} />
            <Route path='cookies' element={<CookiesPage />} />
            <Route path='privacy' element={<PrivacyPage />} />
            <Route path='faq' element={<FaqPage />} />
            <Route path='*' index element={<Common.NotFoundPage />} />
        </Routes>
    );
};
