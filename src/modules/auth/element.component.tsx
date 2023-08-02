import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DiscordAuthRedirect from './components/discord-auth-redirect.component';
import DiscordAuthCallback from './components/discord-auth-callback.component';

export const Element: React.FC = (

) => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route path='*' index element={<Navigate to='discord' replace />} />
                <Route path='discord' element={<DiscordAuthRedirect />} />
                <Route path='discord/callback' element={<DiscordAuthCallback />} />
            </Route>
        </Routes>
    )
}
