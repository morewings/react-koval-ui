export const theme = {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    fontFamilyMonospace: `"SF Mono", "Courier New", FreeMono, "Nimbus Mono PS", Cousine, monospace`,
    sizeUnit: '6px',
    inputWidth: '240px',
    inputHeight: '38px',
    // font sizes
    fontSizeH1: '36px',
    fontSizeH2: '28px',
    fontSizeH3: '24px',
    fontSizeH4: '22px',
    fontSizeH5: '18px',
    fontSizeH6: '16px',
    fontSizeText: '16px',
    fontSizeMedium: '16px',
    fontSizeLarge: '18px',
    fontSizeSmall: '14px',
    fontSizeExtraSmall: '12px',
    // font weights
    fontWeightNormal: 400,
    fontWeightBolder: 500,
    fontWeightBold: 600,
    // colors
    textColor: '#111111',
    background000: 'white',
    background100: '#dedede',
    background200: '#bdbdbd',
    background300: '#808080',
    background400: '#525252',
    background500: '#363636',
    background600: '#000000',
    // theme
    colorDo: '#e3a075',
    colorRe: '#61483a',
    colorMi: '#ffdea6',
    colorFa: '#20b2aa',
    colorSol: '#597480',
    colorLa: '#99DFFF',
    // info colors
    colorError: '#FF004F',
    colorWarning: '#FFC72C',
    colorSuccess: '#3c9d74',
    colorAction: '#2100FF',
    // shadow config
    shadowColor: 'color-mix(in srgb, var(--fg-background-600) 11%, transparent)',
    shadow050: '3px 3px 3px 0 var(--fg-shadow-color)',
    shadow100: '6px 6px 3px 0 var(--fg-shadow-color)',
    shadow200: '9px 9px 3px 0 var(--fg-shadow-color)',
    textShadow: '1px 1px 1px rgb(0 0 0 / 66%)',
    // border radii
    borderRadius100: '2px',
    borderRadius200: '3px',
    borderRadius300: '6px',
    borderRadius400: '9px',
    borderRadius500: '12px',
    // border widths
    borderWidth100: '1px',
    borderWidth200: '2px',
    borderWidth300: '3px',
    timeSM: '333ms',
    timeMD: '666ms',
    timeLG: '999ms',
    timeXL: '1666ms',
};

export type ThemeType = Partial<typeof theme>;
