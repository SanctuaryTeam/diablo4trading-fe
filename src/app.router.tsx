import { Common } from '@modules/common';
import { RouteAuth } from '@modules/route-auth';
import { RouteGlobal } from '@modules/route-global';
import { ContactPage, CookiesPage, FeedbackPage, PrivacyPage } from '@modules/route-global/pages';
import { RouteServices } from '@modules/route-services';
import { RouteTrade } from '@modules/route-trade';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { MasterLayout } from './app.master.layout';

export const router = createBrowserRouter([
    {
        path: 'auth/*',
        element: (
            <MasterLayout hideNavigation>
                <RouteAuth.Element />
            </MasterLayout>
        ),
    },
    {
        path: 'global/*',
        element: (
            <MasterLayout hideNavigation>
                <RouteGlobal.Element />
            </MasterLayout>
        ),
    },
    {
        path: ':language?',
        element: (
            <Common.RouteLanguageProvider indexPath='trade'>
                <MasterLayout>
                    <Common.AssetsProvider>
                        {(loading) => {
                            if (loading) {
                                return (
                                    <Common.FloatingPanel>
                                        <Common.Spinner />
                                    </Common.FloatingPanel>
                                );
                            }
                            return <Outlet />;
                        }}
                    </Common.AssetsProvider>
                </MasterLayout>
            </Common.RouteLanguageProvider>
        ),
        children: [
            { index: true, element: <Navigate to='trade' replace /> },
            { path: 'services/*', element: <RouteServices.Element /> },
            { path: 'trade/*', element: <RouteTrade.Element /> },
            { path: 'feedback/', element: <FeedbackPage /> },
            { path: 'cookies/', element: <CookiesPage /> },
            { path: 'privacy/', element: <PrivacyPage /> },
            { path: 'contact/', element: <ContactPage /> },
            { path: '*', element: <Common.NotFoundPage /> },
        ],
    },
]);
