import { createSlice } from '@reduxjs/toolkit';
import { API } from '@sanctuaryteam/shared';
import { BackendSlice } from './../backend/slice';

interface AuthState {
    token: string;
    user: API.UserDto;
    notifications: API.Notification[];
}

export const AUTH_STATE_INITIAL: AuthState = {
    token: '',
    user: null,
    notifications: [],
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: AUTH_STATE_INITIAL,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                BackendSlice.endpoints.authDiscordCallback.matchFulfilled,
                (state, action) => {
                    state.token = action.payload.token;
                    state.user = action.payload.user;
                },
            )
            .addMatcher(
                BackendSlice.endpoints.editSlotState.matchFulfilled,
                (state, action) => {
                    const { state: newState } = action.meta.arg.originalArgs;
                    let message: string, message2: string;
                    let recipient: API.UserDto, recipient2: API.UserDto;
                    let followUp: boolean = false;

                    switch (newState) {
                        case API.ServiceSlotStates.Accepted:
                            recipient = action?.payload?.client;
                            message = 'Your purchase was approved.';
                            break;
                        case API.ServiceSlotStates.Rejected:
                            recipient = action.payload.client;
                            message = `${
                                action?.payload?.serviceOwner?.battleNetTag.split('#')[0]
                            } has rejected your purchase.`;
                            break;
                        case API.ServiceSlotStates.Ended:
                            followUp = true;
                            recipient = action?.payload?.client;
                            recipient2 = action?.payload?.serviceOwner;
                            message = `Please rate the service from ${recipient2?.battleNetTag.split('#')[0]}.`;
                            message2 = `Please rate the client ${recipient?.battleNetTag.split('#')[0]}.`;
                            break;
                        default:
                            API.ServiceSlotStates.Pending;
                            recipient = action?.payload?.serviceOwner;
                            message = `${
                                action?.payload.client.battleNetTag.split('#')[0]
                            } has purchased your service.`;
                            break;
                    }

                    state.notifications.push({
                        entity: action.payload,
                        recipient,
                        message,
                    });

                    if (followUp && recipient2 && message2) {
                        state.notifications.push({
                            entity: action.payload,
                            recipient: recipient2,
                            message: message2,
                        });
                    }
                },
            );
    },
});
