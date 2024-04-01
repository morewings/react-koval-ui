import type {FC, HTMLAttributes, MouseEvent} from 'react';
import {useMemo} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import {IconSuccess, IconDanger, IconLink} from '@/internal/Icons';
import {ActionTypes} from '@/internal/Actions';

import classes from './Dialog.module.css';

export type Props = {
    title?: string;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
    type?: keyof typeof ActionTypes;
    onClick: (name: MouseEvent<HTMLButtonElement>) => void;
};

export const Action: FC<Props> = ({title, icon, type = 'default', onClick}) => {
    const ActionIcon = useMemo(
        () =>
            icon ??
            {
                [ActionTypes.success]: IconSuccess,
                [ActionTypes.danger]: IconDanger,
                [ActionTypes.link]: IconLink,
                [ActionTypes.default]: undefined,
            }[type],
        [icon, type]
    );

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            onClick(event);
        },
        [onClick]
    );

    return (
        <button
            title={title}
            onClick={handleClick}
            className={classNames(classes.actionButton, {
                [classes.default]: type === ActionTypes.default,
                [classes.link]: type === ActionTypes.link,
                [classes.success]: type === ActionTypes.success,
                [classes.danger]: type === ActionTypes.danger,
            })}>
            {ActionIcon && <ActionIcon className={classes.actionIcon} />}
            {title && <span className={classes.actionLabel}>{title}</span>}
        </button>
    );
};
