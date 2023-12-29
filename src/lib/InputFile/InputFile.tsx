import type {ChangeEvent, InputHTMLAttributes} from 'react';
import {useState} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader, IconFile} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputFile.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'inputMode' | 'maxLength' | 'minLength' | 'pattern'> &
    CallbackPropsTextual & {
        accept?: InputHTMLAttributes<HTMLInputElement>['accept'];
        multiple?: InputHTMLAttributes<HTMLInputElement>['multiple'];
    };

export const InputFile = forwardRef<HTMLInputElement, Props>(
    (
        {
            id: idProp,
            className,
            placeholder = '',
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);
        const [filename, setFileName] = useState('');
        const {validateTextual, validity, setValidity} = useValidation({validatorFn: defaultValidator});
        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
        }[validity!];
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                setFileName(event.target.files![0].name);
            },
            [onChange, setFileName]
        );

        const handleInvalid = useCallback(() => {
            setFileName('');
            setValidity(ValidationState.error);
        }, [setValidity]);
        return (
            <div className={classNames(classes['input-file'], className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        id={id}
                        type="file"
                        placeholder={placeholder}
                        className={classes.input}
                        ref={ref}
                        disabled={disabled}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onInvalid={handleInvalid}
                        onInput={validateTextual}
                    />
                    <IconFile className={classNames(classes.icon)} />
                </div>
                <label data-disabled={disabled} htmlFor={id} className={classes.label}>
                    {filename || placeholder}
                </label>
                {validity && <ValidationIcon className={classes.validity} />}
            </div>
        );
    }
);

InputFile.displayName = 'InputFile';
