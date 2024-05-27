import type {FC, ReactNode} from 'react';
import {useMemo} from 'react';
import {RootThemeProvider} from 'css-vars-hook';

import {theme as themeGeneric} from '@/lib/Theme';
import {DialogProvider} from '@/lib/Dialog';
import {NotificationProvider} from '@/lib/Notification';
import {ToastProvider} from '@/lib/Toast';
import {DrawerProvider} from '@/lib/Drawer';
import {convertThemeVarName} from '@/internal/utils/convertThemeVarName.ts';

import classes from './Provider.module.css';

export type Props = {children?: ReactNode; theme?: typeof themeGeneric};

export const Provider: FC<Props> = ({children, theme = themeGeneric}) => {
    const convertedTheme = useMemo(() => {
        const entries = Object.entries(theme).map(([key, value]) => [
            convertThemeVarName(key),
            value,
        ]);
        return Object.fromEntries(entries);
    }, [theme]);
    console.log('convertedTheme', convertedTheme);
    return (
        <RootThemeProvider theme={convertedTheme} className={classes.provider}>
            <DialogProvider>
                <NotificationProvider>
                    <ToastProvider>
                        <DrawerProvider>{children}</DrawerProvider>
                    </ToastProvider>
                </NotificationProvider>
            </DialogProvider>
        </RootThemeProvider>
    );
};
