import { Common } from '@modules/common';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Nav } from './components';
import { ListingsPage, SearchPage } from './pages';

export const Element: React.FC = (

) => {
    return (
        <Routes>
            <Route
                path=':serverType?'
                element={(
                    <Common.RouteServerTypeProvider indexPath='search'>
                        <Common.ServerTypeSelect />
                        <Nav />
                        <Outlet />
                    </Common.RouteServerTypeProvider>
                )}
            >
                <Route path='*' index element={<Navigate to='search' replace />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='listings' element={<ListingsPage />} />
            </Route>
        </Routes>
    );
}