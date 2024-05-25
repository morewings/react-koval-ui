import type {ReactNode} from 'react';
import {useMemo, forwardRef} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import classes from './Skeleton.module.css';
import type {SkeletonProps} from './SkeletonTypes.ts';
import {normalizeUnit} from './normalizeUnit.ts';

export type Props = DataAttributes &
    LibraryProps &
    SkeletonProps & {
        borderRadius?: number;
        children?: ReactNode;
    };

export const SkeletonFrame = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            width = 'fluid',
            height = 'fluid',
            borderRadius = 12,
            marginY = 0,
            marginX = 0,
            ...nativeProps
        },
        ref
    ) => {
        const {LocalRoot, ref: innerRef} = useLocalTheme<HTMLDivElement>();
        useLinkRefs(ref, innerRef);
        const theme = useMemo(
            () => ({
                width: normalizeUnit(width),
                height: normalizeUnit(height),
                borderRadius,
                marginY,
                marginX,
            }),
            [borderRadius, height, marginX, marginY, width]
        );
        return (
            <LocalRoot
                {...nativeProps}
                theme={theme}
                className={classNames(classes.skeletonFrame, className)}>
                {children}
            </LocalRoot>
        );
    }
);

SkeletonFrame.displayName = 'SkeletonFrame';
