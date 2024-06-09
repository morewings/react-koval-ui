import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {actionsMockMultiple} from '@/internal/Actions';

import {Actions} from './Actions.tsx';

const meta = {
    title: 'Components/Actions',
    component: Actions,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {},
    argTypes: {
        className: {
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
    },
} as Meta<typeof Actions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Actions {...args} />;
    },
    args: {
        actions: actionsMockMultiple,
    },
};

export const WithCode: Story = {
    render: args => {
        // here comes the code
        return <Actions {...args} />;
    },
};

WithCode.args = {
    id: 'foo',
};

WithCode.argTypes = {};

WithCode.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
