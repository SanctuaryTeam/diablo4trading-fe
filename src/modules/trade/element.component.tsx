import { Common } from '@modules/common';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MasterLayout } from './layout';
import { ListingsPage, SearchPage } from './pages';
import { AssetsProvider, RouteServerTypeProvider } from './providers';

export const Element: React.FC = (

) => {
    return (
        <AssetsProvider>
            {loading => {
                if (loading) {
                    return (
                        <Common.FloatingPanel>
                            <Common.Spinner />
                        </Common.FloatingPanel>
                    );
                }
                return (
                    <Routes>
                        <Route
                            path=':serverType?'
                            element={(
                                <RouteServerTypeProvider indexPath='search'>
                                    <MasterLayout>
                                        <Outlet />
                                    </MasterLayout>
                                </RouteServerTypeProvider>
                            )}
                        >
                            <Route path='*' index element={<Navigate to='search' replace />} />
                            <Route path='search' element={<SearchPage />} />
                            <Route path='listings' element={<ListingsPage />} />
                        </Route>
                    </Routes>
                )
            }}
        </AssetsProvider>
    )
}