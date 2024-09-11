import type {FC, SVGProps} from 'react';
import Icon from '@phosphor-icons/core/assets/bold/align-center-vertical-simple-bold.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconUnPin: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};