import { Game } from '@diablosnaps/common';
import React from 'react';
import { ServerTypeContext } from './server-type.context';

interface ServerTypeProviderProps {
    value: Game.ServerType;
    onChange: (serverType: Game.ServerType) => void;
    children?: React.ReactNode;
}

export const ServerTypeProvider: React.FC<ServerTypeProviderProps> = ({
    value,
    onChange,
    children,
}) => {
    const ctx = React.useMemo<ServerTypeContext>(() => {
        return [value, onChange];
    }, [onChange, value]);
    return (
        <ServerTypeContext.Provider value={ctx}>
            {children}
        </ServerTypeContext.Provider>
    )
}