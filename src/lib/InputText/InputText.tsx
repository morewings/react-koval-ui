import type {ChangeEvent, FC} from 'react';
import {Fragment} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';

import classes from './InputText.module.css';

type Props = DataAttributes &
    LibraryProps &
    NativePropsTextual &
    CallbackPropsTextual &
    ValidationProps & {
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        prefix?: FC;
    };

export const InputText = forwardRef<HTMLInputElement, Props>(
    (
        {
            prefix: Prefix,
            className,
            type = 'text',
            placeholder = '',
            disabled,
            value: valueProp,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            initialValidity,
            validatorFn = defaultValidator,
            ...nativeProps
        },
        ref
    ) => {
        const {validateTextual, validity, setValidity} = useValidation({validatorFn, initialValidity});
        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
            [ValidationState.submitting]: Fragment,
        }[validity!];
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        return (
            <div className={classNames(classes.wrapper, className)}>
                {Prefix && <Prefix />}
                <input
                    {...nativeProps}
                    placeholder={placeholder}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    type={type}
                    value={valueProp}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInvalid={handleInvalid}
                    onInput={validateTextual}
                />
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

InputText.displayName = 'InputText';
