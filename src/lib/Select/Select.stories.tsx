import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {validatorAsync, validatorSync} from '@/internal/inputs';
import {CloudUpload} from '@/internal/Icons';

import {Select} from './Select.tsx';

const meta = {
    title: 'Inputs/Select',
    component: Select,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        required: false,
        multiple: false,
        size: 16,
    },
    argTypes: {
        value: {control: 'text'},
        defaultValue: {control: 'text'},
        onBlur: {
            table: {
                disable: true,
            },
        },
        onFocus: {
            table: {
                disable: true,
            },
        },
        autoComplete: {
            table: {
                disable: true,
            },
        },
        onKeyDown: {
            table: {
                disable: true,
            },
        },
        onKeyUp: {
            table: {
                disable: true,
            },
        },
        id: {
            table: {
                disable: true,
            },
        },
        role: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
        name: {
            table: {
                disable: true,
            },
        },
        autoFocus: {
            table: {
                disable: true,
            },
        },
        form: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        validatorFn: {
            options: ['noValidator', 'syncValidator', 'asyncValidator'], // An array of serializable values
            mapping: {
                noValidator: undefined,
                syncValidator: validatorSync,
                asyncValidator: validatorAsync,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noValidator: 'No custom validator',
                    syncValidator: 'Sync validator (value.length < 4)',
                    asyncValidator: 'Async validator (value.length < 4)',
                },
            },
        },
        prefix: {
            options: ['noPrefix', 'withPrefix'],
            mapping: {
                noPrefix: undefined,
                withPrefix: CloudUpload,
            },
            control: {
                type: 'radio',
                labels: {
                    // 'labels' maps option values to string labels
                    noPrefix: 'No prefix',
                    withPrefix: 'With prefix',
                },
            },
        },
    },
} as Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Select {...args}>
                <option value="foo">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
                <option value="Option 4">Option 4</option>
                <option value="Option 5">Option 5</option>
                <option value="Option long">Option that has too long of a value to fit</option>
            </Select>
        );
    },
    args: {
        defaultValue: 'Option 3',
    },
    argTypes: {
        value: {
            table: {
                disable: true,
            },
        },
        defaultValue: {
            table: {
                disable: true,
            },
        },
    },
};

export const ControlledState: Story = {
    render: args => {
        const [value, setValue] = useState(args.value);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLSelectElement>) => {
                console.log('Value captured:', event.target.value);
                setValue(event.target.value);
            },
            [setValue]
        );
        return (
            <Select {...args} onChange={handleChange} value={value}>
                <option value="foo">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
                <option value="Option 4">Option 4</option>
                <option value="Option 5">Option 5</option>
                <option value="Option long">Option that has too long of a value to fit</option>
            </Select>
        );
    },
};

ControlledState.args = {
    value: 'Option 2',
};

ControlledState.argTypes = {
    defaultValue: {
        table: {
            disable: true,
        },
    },
    value: {
        table: {
            disable: true,
        },
    },
};

ControlledState.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
