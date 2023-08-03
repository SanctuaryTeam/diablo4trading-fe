import { Common } from '@modules/common';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Nav } from './components';
import { ListingsPage, SearchPage } from './pages';
import React from 'react';

export const Element: React.FC = (

) => {
    return (
        <Routes>
            <Route
                element={(
                    <React.Fragment>
                        <Nav />
                        <Outlet />
                    </React.Fragment>
                )}
            >
                <Route path='*' index element={<Navigate to='search' replace />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='listings' element={<ListingsPage />} />
            </Route>
        </Routes>
    );
}
