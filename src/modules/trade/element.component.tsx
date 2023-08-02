import { Game } from '@diablosnaps/common';
import { Common } from '@modules/common';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { MasterLayout } from './layout';
import { ListingsPage, SearchPage } from './pages';
import { AssetsProvider, ServerTypeProvider } from './providers';

const SERVER_TYPE_PATHS: Record<Game.ServerType, string> = {
    [Game.ServerType.Eternal]: 'eternal',
    [Game.ServerType.Hardcore]: 'hardcore',
    [Game.ServerType.Seasonal]: 'seasonal',
    [Game.ServerType.SeasonalHardcore]: 'seasonal-hardcore',
};

export const Element: React.FC = (

) => {
    const navigate = useNavigate();

    const handleServerTypeChange = (serverType: Game.ServerType) => {
        navigate(`./${SERVER_TYPE_PATHS[serverType]}/search`);
    };

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
                        <Route path='*' index element={<Navigate to={`./${SERVER_TYPE_PATHS[Game.ServerType.Seasonal]}/search`} replace />} />
                        {Object
                            .values(Game.ServerType)
                            .map((serverType) => (
                                <Route
                                    key={serverType}
                                    path={`${SERVER_TYPE_PATHS[serverType]}/*`}
                                    element={(
                                        <ServerTypeProvider
                                            value={serverType}
                                            onChange={handleServerTypeChange}
                                        >
                                            <MasterLayout>
                                                <Outlet />
                                            </MasterLayout>
                                        </ServerTypeProvider>
                                    )}
                                >
                                    <Route path='*' index element={<Navigate to='search' replace />} />
                                    <Route path='search' element={<SearchPage />} />
                                    <Route path='listings' element={<ListingsPage />} />
                                </Route>
                            ))
                        }
                    </Routes>
                )
            }}
        </AssetsProvider>
    )
}