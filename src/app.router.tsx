import { Common } from '@modules/common';
import { RouteAuth } from '@modules/route-auth';
import { RouteServices } from '@modules/route-services';
import { RouteTrade } from '@modules/route-trade';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { MasterLayout } from './app.master.layout';
import { NotFoundPage } from './app.not-found.page';

export const router = createBrowserRouter([
    {
        path: 'auth/*',
        element: (
            <MasterLayout hideHeader>
                <RouteAuth.Element />
            </MasterLayout>
        )
    },
    {
        path: ':language?',
        element: (
            <Common.RouteLanguageProvider>
                <Common.AssetsProvider>
                    {loading =>
                        loading ?
                            (
                                <MasterLayout hideHeader={true}>
                                    <Common.FloatingPanel>
                                        <Common.Spinner />
                                    </Common.FloatingPanel>
                                </MasterLayout>
                            )
                            :
                            (
                                <Outlet />
                            )
                    }
                </Common.AssetsProvider>
            </Common.RouteLanguageProvider>
        ),
        children: [
            {
                path: ':serverType?',
                element: (
                    <Common.RouteServerTypeProvider indexPath='trade'>
                        <MasterLayout>
                            <Outlet />
                        </MasterLayout>
                    </Common.RouteServerTypeProvider>
                ),
                children: [
                    // { index: true, element: <Navigate to='trade' replace /> },
                    { path: 'trade/*', element: <RouteTrade.Element /> },
                    { path: 'services/*', element: <RouteServices.Element /> },
                    { path: '*', element: <NotFoundPage /> }
                ]
            }
        ]

    }
]);
