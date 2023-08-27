import { Common } from '@modules/common';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ContactPage, CookiesPage, PrivacyPage } from './pages';

export const Element: React.FC = () => {
    const navigate = useNavigate();
    
    const redirectToDiscord = () => {
        window.location.href = 'https://discord.com/invite/diablo4'; // Redirect to Discord link
    };
    
    return (
        <Routes>
            <Route path='contact' element={<ContactPage />} onClick={redirectToDiscord} /> {/* Add onClick handler */}
            <Route path='cookies' element={<CookiesPage />} />
            <Route path='privacy' element={<PrivacyPage />} />
            <Route path='*' index element={<Common.NotFoundPage />} />
        </Routes>
    );
};
