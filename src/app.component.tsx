import { RouterProvider } from 'react-router-dom';
import { router } from './app.router';
import { Common } from './modules/common';
import { Provider } from 'react-redux';
import store from './modules/store/store';

export const App: React.FC = (

) => {
    return (
        <Provider store={store}>
            <Common.AuthProvider>
                <Common.Theme>
                    <RouterProvider router={router} />
                </Common.Theme>
            </Common.AuthProvider>
        </Provider>
    )
};
