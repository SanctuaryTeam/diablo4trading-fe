import { Common } from '@modules/common';
import { Redux } from '@modules/redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.router';

export const App: React.FC = () => {
    return (
        <Redux.StoreProvider>
            <Common.LanguageSwitch>
                <Common.Theme>
                    <RouterProvider router={router} />
                </Common.Theme>
            </Common.LanguageSwitch>
        </Redux.StoreProvider>
    );
};
