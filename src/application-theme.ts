import {createMuiTheme} from "@material-ui/core";

export const applicationColors = {
    $base0: '#000',
    $base1: '#FFF',
    $shade20: '#DDDDDD',
    $shade40: '#A9A9A9',
    $shade50: '#82786A',
    $easy: '#2FB65D',
    $medium: '#EB8A31',
    $hard: '#EB3C31',
}


export const theme = createMuiTheme({
    palette: {
        secondary: {
            main: applicationColors.$shade50,
        },
    },
    typography: {
        h1: {
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: '80px',
            fontFamily: 'Gilroy',
        },
        h2: {
            fontSize: '40px',
            fontWeight: 800,
            lineHeight: '48px',
            fontFamily: 'Gilroy',
        },
        h3: {
            fontSize: '24px',
            fontWeight: 800,
            lineHeight: '28px',
            fontFamily: 'Gilroy',
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
        },
        subtitle1: {
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '16px',
        },
        subtitle2: {
            fontSize: '9px',
            fontWeight: 700,
            lineHeight: '10.55px',
        }
    },
    shape: {
        borderRadius: 8,
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                borderRadius: 28,
                '&$focused $notchedOutline': {
                    border: '1px solid',
                    borderColor: applicationColors.$shade40,
                }
            },
        },
        MuiPaper: {
            elevation1: {
                boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
            }
        },
        MuiChip: {
            root:{
                backgroundColor: applicationColors.$base1,
            }
        },
        MuiTouchRipple: {
            ripple:{
                backgroundColor: applicationColors.$shade20,
            }
        },
        MuiSvgIcon: {
            fontSizeSmall: {
                fontSize: 16
            }
        },
        MuiDialogActions: {
            root: {
                justifyContent: 'space-between',
                padding: 32
            }
        },
        MuiDialogTitle: {
            root:{
                padding: 32,
                paddingBottom: 28,
            }
        },
        MuiDialogContent: {
            root: {
                padding: 32,
                paddingTop: 0,
            }
        },
    },
});
