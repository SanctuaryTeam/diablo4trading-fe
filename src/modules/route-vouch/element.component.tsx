import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { VouchPage } from './pages';

export const Element: React.FC = () => {
    return (
        <Routes>
            <Route path='*' index element={<VouchPage />} />
        </Routes>
    );
};
