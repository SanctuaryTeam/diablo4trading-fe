import { AnyAction, createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface SnackbarState {
    error: boolean;
    active: boolean;
    message: string;
    timeout: number;
}

export const SNACKBAR_STATE_INITIAL: SnackbarState = {
    error: true,
    active: false,
    message: null,
    timeout: null,
};

export const handleErrorWithSnackbar = createAsyncThunk<{ timeout: number }, void, {
    state: RootState;
    dispatch: Dispatch<AnyAction>;
}>(
    'snackbar/handleError',
    async (_, { dispatch, getState }) => {
        const snackbarState = getState().snackbar;
        if (snackbarState.timeout) {
            window.clearTimeout(snackbarState.timeout);
        }
        const timeout = window.setTimeout(() => {
            dispatch(SnackbarSlice.actions.setActive(false));
            dispatch(SnackbarSlice.actions.setMessage(null));
        }, 1000 * 5);
        return { timeout };
    },
);

interface ErrorMessage {
    data: {
        message: string;
    };
}

type RejectedActionWithMessage = PayloadAction<ErrorMessage>;

export const isRejectedActionWithMessage = (action: AnyAction): action is RejectedActionWithMessage => {
    return action?.type?.endsWith('/rejected') && typeof action?.payload?.data?.message === 'string';
};

export const SnackbarSlice = createSlice({
    name: 'snackbar',
    initialState: SNACKBAR_STATE_INITIAL,
    reducers: {
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        },
        setActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        setTimeout: (state, action: PayloadAction<number>) => {
            state.timeout = action.payload;
        },
        setState: (state, action: PayloadAction<SnackbarState>) => {
            state = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                isRejectedActionWithMessage,
                (state, action: RejectedActionWithMessage) => {
                    state.message = action.payload.data.message;
                    state.active = true;
                },
            );
    },
});

export default SnackbarSlice.reducer;
