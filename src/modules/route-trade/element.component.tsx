import { Common } from '@modules/common';
import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Nav } from './components';
import { ListingsPage, SearchPage } from './pages';

export const Element: React.FC = () => {
    return (
        <Routes>
            <Route
                element={
                    <React.Fragment>
                        <Nav />
                        <Outlet />
                    </React.Fragment>
                }
            >
                <Route path='*' index element={<Navigate to='search' replace />} />
                <Route
                    path='search/:serverType?'
                    element={
                        <Common.RouteServerTypeProvider>
                            <SearchPage />
                        </Common.RouteServerTypeProvider>
                    }
                />
                <Route path='listings/:id?' element={<ListingsPage />} />
            </Route>
        </Routes>
    );
};
