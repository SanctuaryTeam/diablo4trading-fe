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
                BackendSlice.endpoints.serviceSlotSearch.matchFulfilled,
                (state, action) => {
                    const {userId} = action.meta.arg.originalArgs;
                    state.notifications = [];

                    action.payload.forEach(result => {
                        const notification = {
                            entity: result,
                            message: null,
                            recipient: null,
                        };

                        switch (userId) {
                            case result?.clientUserId:
                                notification.recipient = result?.client;                                
                                break;                        
                            default: result?.serviceOwnerUserId
                                notification.recipient = result?.serviceOwner;
                                break;
                        }

                        switch (result?.state) {
                            case API.ServiceSlotStates.Accepted:  
                                if (notification.recipient == result?.client) {
                                    notification.message = "Your purhase was approved. Please mark when the service has ended."
                                } else {
                                    notification.message = "Please mark when the service has ended."
                                }   
                                break;   
                            case API.ServiceSlotStates.Rejected: 
                                if (notification.recipient == result?.client) {
                                    notification.message = "Your purhase was rejected."
                                }                                   
                                break;     
                            case API.ServiceSlotStates.Ended:    
                                if (notification.recipient == result?.client) {
                                    notification.message = `Please rate the service.`
                                } else {
                                    notification.message = `Please rate the client.`
                                }                         
                                break;                        
                            default: API.ServiceSlotStates.Pending
                                if (notification.recipient == result?.serviceOwner) {
                                    notification.message = `User with a score of ${result?.client?.vouchScore} purchased your service.`
                                }      
                                break;
                        }
                        
                        if (notification.entity  && notification.message && notification.recipient) {
                            state.notifications.push(notification);
                        }                        
                    })
                },
            )
            .addMatcher(
                BackendSlice.endpoints.editSlotState.matchFulfilled,
                (state, action) => {
                    const { id: serviceSlotId,state: newState } = action.meta.arg.originalArgs;

                    state.notifications.map((notification, index) => {
                        if (notification?.entity?.id === serviceSlotId) {
                            switch (newState) {
                                case API.ServiceSlotStates.Accepted:  
                                    if (notification.recipient == notification?.entity?.client) {
                                        state.notifications[index].message = "Your purhase was approved. Please mark when the service has ended.";
                                    } else {
                                        state.notifications[index].message = "Please mark when the service has ended.";
                                    }
                                    return state.notifications[index].entity.state = newState;    
                                case API.ServiceSlotStates.Rejected: 
                                    if (notification.recipient == notification?.entity?.client) {
                                        state.notifications[index].message = "Your purhase was rejected.";
                                    }
                                    return state.notifications[index].entity.state = newState;  
                                case API.ServiceSlotStates.Ended:    
                                    if (notification.recipient == notification?.entity?.client) {
                                        state.notifications[index].message = `Please rate the service.`;
                                    } else {
                                        state.notifications[index].message = `Please rate the client.`;
                                    }
                                    return state.notifications[index].entity.state = newState;                  
                                default: API.ServiceSlotStates.Pending
                                    if (notification.recipient == notification?.entity?.serviceOwner) {
                                        state.notifications[index].message = `User with a score of ${notification?.entity?.client?.vouchScore} purchased your service.`;                                    
                                    }      
                                    return state.notifications[index].entity.state = newState;  
                            }
                        }
                    });
                },
            );
    },
});
