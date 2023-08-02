import { Common } from '@modules/common';
import { Trade } from '@modules/trade';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: ':language?',
        element: (
            <Common.RouteLanguageProvider indexPath='trade'>
                <Common.MasterLayout>
                    <Common.AssetsProvider>
                        {loading => {
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
                </Common.MasterLayout>
            </Common.RouteLanguageProvider>
        ),
        children: [
            { index: true, element: <Navigate to='trade' replace /> },
            { path: 'trade/*', element: <Trade.Element /> },
            // { path: 'services/*', element: <Trade.Element /> },
            { path: '*', element: <Common.NotFoundPage /> }
        ]
    }
]);