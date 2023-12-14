import type {ChangeEvent} from 'react';
import {Fragment} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import type {NativePropsInteractive, CallbackPropsInteractive, ValidationProps} from '@/internal/inputs';
import {IconError, IconLoader, IconValid} from '@/internal/Icons';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputCheckbox.module.css';

type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsInteractive &
    ValidationProps & {
        label?: string;
    };

export const InputCheckbox = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            checked,
            defaultChecked,
            id: idProp,
            label,
            validatorFn = defaultValidator,
            required,
            initialValidity,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);
        const {validateInteractive, validity, setValidity} = useValidation({validatorFn, initialValidity});
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
                <input
                    {...nativeProps}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    type="checkbox"
                    id={id}
                    value={value}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInput={validateInteractive}
                    onInvalid={handleInvalid}
                    onSubmit={() => {
                        console.log('form submit started');
                    }}
                    required={required}
                />
                <label className={classes.label} htmlFor={id}>
                    {label} {required && <span className={classes.required}>*</span>}
                </label>
                {validity && <ValidationIcon className={classes.icon} />}
            </div>
        );
    }
);

InputCheckbox.displayName = 'InputRadio';
