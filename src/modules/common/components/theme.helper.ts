import { autocompleteClasses, backdropClasses, Theme } from '@mui/material';
import { alpha, createTheme } from '@mui/material/styles';

interface AppThemeOptions {
    disableAnimations?: boolean;
}

export function createAppTheme(
    options: AppThemeOptions = {},
): Theme {
    return createTheme({
        typography: {
            fontFamily: 'Alegreya Sans, sans-serif',
            subtitle1: {
                fontWeight: 500,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    '::-webkit-scrollbar': {
                        background: alpha(theme.palette.common.white, 0.06),
                        width: 12,
                        height: 12,
                        borderRadius: 12,
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: theme.palette.primary.dark,
                        borderRadius: 12,
                    },
                    ':not(input):not(textarea)': {
                        '&, &::after, &::before': {
                            userSelect: 'none',
                        },
                    },
                    ...(options.disableAnimations && {
                        '*, *::before, *::after': {
                            transition: 'none !important',
                            animation: 'none !important',
                        },
                    }),
                    'strong, b': {
                        fontWeight: theme.typography.fontWeightMedium,
                    },
                }),
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        [`& > .${backdropClasses.root}`]: {
                            backgroundColor: alpha(theme.palette.common.black, 0.9),
                        },
                    }),
                },
            },

            MuiSelect: {
                defaultProps: {
                    variant: 'filled',
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    listbox: {
                        padding: 0,
                        [`& > .${autocompleteClasses.option}`]: {
                            paddingRight: 9,
                            paddingLeft: 9,
                        },
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: 'small',
                    variant: 'filled',
                    fullWidth: true,
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRadius: theme.shape.borderRadius,
                        ':before': {
                            borderBottom: 'none !important',
                        },
                    }),
                    input: {
                        height: 19,
                    },
                },
            },

            MuiAlert: {
                styleOverrides: {
                    root: {
                        alignItems: 'center',
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: ({ theme }) => ({
                        ...theme.typography.body2,
                    }),
                },
                defaultProps: {
                    disableInteractive: true,
                },
            },
        },
        palette: {
            primary: {
                main: '#d32f2f',
            },
            secondary: {
                main: '#ffe082',
            },
            item: {
                common: '#ffffff',
                magic: '#ababf8',
                rare: '#ffff00',
                number: '#ffffff',
                text: '#bfbfbf',
            },
            mode: 'dark',
        },
    });
}
