import type {Meta, StoryObj} from '@storybook/react';

// import {fn} from '@storybook/test';
import {localeControl} from '@/internal/locale';

import {NameTime} from './NameTime.tsx';

const meta = {
    title: 'Typography/Name/Time period',
    component: NameTime,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        timePeriod: 'era',
    },
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
        locale: localeControl,
    },
} as Meta<typeof NameTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <NameTime {...args} />;
    },
    args: {},
};