import { Navigate, Route, Routes } from 'react-router-dom';
import { DiscordAuthPage, DiscordAuthRedirectPage } from './pages';

export const Element: React.FC = (

) => {
    return (
        <Routes>
            <Route path='*' index element={<Navigate to='discord' replace />} />
            <Route path='discord' element={<DiscordAuthRedirectPage />} />
            <Route path='discord/callback' element={<DiscordAuthPage />} />
        </Routes>
    )
}
