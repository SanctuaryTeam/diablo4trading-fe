import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { Common } from './modules/common';
import { I18n } from './modules/i18n';
import { Trade } from './modules/trade';
import { Auth } from './modules/auth';

export const router = createBrowserRouter([
    {
        path: 'auth/*',
        element: (<Auth.Element />)
    },
    {
        path: ':language?',
        element: (
            <I18n.LanguageProvider>
                <I18n.Switch>
                    <Common.MasterLayout>
                        <Outlet />
                    </Common.MasterLayout>
                </I18n.Switch>
            </I18n.LanguageProvider>
        ),
        children: [
            { index: true, element: <Navigate to='trade' replace /> },
            { path: 'trade/*', element: <Trade.Element /> },
            { path: '*', element: <Common.NotFoundPage /> }
        ]
    }
]);
