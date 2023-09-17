import { Game } from '@diablosnaps/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLanguage } from './types';

interface UserState {
    language: UserLanguage;
    serverType: Game.ServerType;
}

export const USER_STATE_INITIAL: UserState = {
    language: UserLanguage.English,
    serverType: Game.ServerType.Seasonal,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState: USER_STATE_INITIAL,
    reducers: {
        setLanguage: (state, action: PayloadAction<UserLanguage>) => {
            state.language = action.payload;
        },
        setServerType: (state, action: PayloadAction<Game.ServerType>) => {
            state.serverType = action.payload;
        },
    },
});
