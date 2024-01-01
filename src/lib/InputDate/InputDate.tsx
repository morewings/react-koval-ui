import type {ChangeEvent, FocusEvent} from 'react';
import {useRef} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader, IconCalendar} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {defaultValidator} from '@/internal/inputs';
import {ValidationState, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputDate.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode'> &
    CallbackPropsTextual &
    ValidationProps & {min?: string; max?: string};

export const InputDate = forwardRef<HTMLInputElement, Props>(
    (
        {
            id: idProp,
            className,
            placeholder = 'YYYY-MM-DD',
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            validatorFn = defaultValidator,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);
        const labelRef = useRef<HTMLLabelElement>(null);

        const {validateTextual, validity, setValidity} = useValidation({validatorFn});
        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
        }[validity!];
        const displayValue = (value ?? defaultValue) as string;
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                if (labelRef?.current) {
                    labelRef.current.innerText = event.target.value;
                }
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onFocus(event);
                event.target.showPicker();
            },
            [onFocus]
        );
        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onBlur(event);
            },
            [onBlur]
        );

        const handleInput = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                validateTextual(event);
            },
            [validateTextual]
        );

        return (
            <div className={classNames(classes['input-date'], className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        id={id}
                        ref={ref}
                        className={classes.input}
                        type="date"
                        disabled={disabled}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        onInput={handleInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                    />
                    <IconCalendar className={classNames(classes.icon)} />
                </div>
                <label data-disabled={disabled} htmlFor={id} className={classes.label} ref={labelRef}>
                    {displayValue || placeholder}
                </label>
                {validity && <ValidationIcon className={classes.validity} />}
            </div>
        );
    }
);

InputDate.displayName = 'InputDate';