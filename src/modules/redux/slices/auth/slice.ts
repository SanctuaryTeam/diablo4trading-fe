import { createSlice } from '@reduxjs/toolkit';
import { API } from '@sanctuaryteam/shared';
import { BackendSlice } from './../backend/slice';

interface AuthState {
    token: string;
    user?: API.UserDto;
    notifications: API.UserNotificationDto[];
}

export const AUTH_STATE_INITIAL: AuthState = {
    token: '',
    user: undefined,
    notifications: [],
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: AUTH_STATE_INITIAL,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.user = undefined;
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
                BackendSlice.endpoints.searchNotifications.matchFulfilled,
                (state, action) => {
                    const { recipientId } = action.meta.arg.originalArgs;
                    state.notifications = [];

                    action.payload.forEach((result: API.UserNotificationDto) => {
                        recipientId === result.recipient.id
                            && state.notifications.push(result);
                    });
                },
            )
            .addMatcher(
                BackendSlice.endpoints.closeVouch.matchFulfilled,
                (state, action) => {
                    const { rating, isPositive, description } = action.meta.arg.originalArgs;
                    const vouch = action.payload;
                    if (rating === vouch.rating && isPositive === vouch.isPositive) {
                        const notification: API.UserNotificationDto = {
                            id: vouch.id,
                            recipient: vouch.recipient,
                            reference: vouch,
                            referenceType: 'UserVouch',
                            message: description,
                            createdAt: new Date(),
                        };

                        notification && state.notifications.push(notification);
                    }
                },
            )
            // .addMatcher(
            //     BackendSlice.endpoints.serviceSlotSearch.matchFulfilled,
            //     (state, action) => {
            //         const { userId } = action.meta.arg.originalArgs;
            //         state.notifications = [];

            //         action.payload.forEach(result => {
            //             const notification = {
            //                 entity: result,
            //                 message: null,
            //                 recipient: null,
            //             };

            //             switch (userId) {
            //                 case result?.clientUserId:
            //                     notification.recipient = result?.client;
            //                     break;
            //                 default:
            //                     result?.serviceOwnerUserId;
            //                     notification.recipient = result?.serviceOwner;
            //                     break;
            //             }

            //             switch (result?.state) {
            //                 case API.ServiceSlotStates.Accepted:
            //                     if (notification.recipient.id == result?.clientUserId) {
            //                         notification.message =
            //                             'Your purhase was approved. Please mark when the service has ended.';
            //                     } else {
            //                         notification.message = 'Please mark when the service has ended.';
            //                     }
            //                     break;
            //                 case API.ServiceSlotStates.Rejected:
            //                     if (notification.recipient.id == result?.clientUserId) {
            //                         notification.message = 'Your purhase was rejected.';
            //                     }
            //                     break;
            //                 case API.ServiceSlotStates.Ended:
            //                     if (notification.recipient.id == result?.clientUserId) {
            //                         notification.message = `Please rate the service.`;
            //                     } else {
            //                         notification.message = `Please rate the client.`;
            //                     }
            //                     break;
            //                 default:
            //                     API.ServiceSlotStates.Pending;
            //                     if (notification.recipient.id == result?.serviceOwnerUserId) {
            //                         notification.message =
            //                             `User with a score of ${result?.client?.vouchScore} purchased your service.`;
            //                     }
            //                     break;
            //             }

            //             if (notification.entity && notification.message && notification.recipient) {
            //                 state.notifications.push(notification);
            //             }
            //         });
            //     },
            // )
            .addMatcher(
                BackendSlice.endpoints.editSlotState.matchFulfilled,
                (state, action) => {
                    const { id: serviceSlotId, state: newState } = action.meta.arg.originalArgs;

                    state.notifications.map((notification, index) => {
                        if (isServiceSlotDto(notification.reference) && notification.reference.id === serviceSlotId) {
                            state.notifications[index].recipient.battleNetTag = action.payload.recipient.battleNetTag;
                            switch (newState) {
                                case API.ServiceSlotStates.Accepted:
                                    if (notification.recipient.id == notification.reference.clientUserId) {
                                        state.notifications[index].message =
                                            'Your purhase was approved. Please mark when the service has ended.';
                                    } else {
                                        state.notifications[index].message = 'Please mark when the service has ended.';
                                    }
                                    return state.notifications[index].reference.state = newState;
                                case API.ServiceSlotStates.Rejected:
                                    return state.notifications.splice(index, 1);
                                case API.ServiceSlotStates.Ended:
                                    return state.notifications.splice(index, 1);
                                default:
                                    API.ServiceSlotStates.Pending;
                                    if (notification.recipient.id == notification.reference.serviceOwnerUserId) {
                                        state.notifications[index].message =
                                            `User with a score of ${notification.reference.client.vouchScore} purchased your service.`;
                                    }
                                    return state.notifications[index].reference.state = newState;
                            }
                        }
                    });
                },
            );
    },
});

// Define a type guard function to check if an object is of type ServiceSlotDto
function isServiceSlotDto(obj: any): obj is API.ServiceSlotDto {
    return obj && obj.client;
}

export default AuthSlice.reducer;
