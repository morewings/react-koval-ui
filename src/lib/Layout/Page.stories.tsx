import type {Meta, StoryObj} from '@storybook/react';

import {Page} from './Page.tsx';
import {
    noChildren,
    withGrid,
    withStickyHeader,
    withScroll,
    withRightSidebar,
    withLeftSidebar,
    onlyFooter,
} from './demoComponents/PageExample.tsx';

const meta = {
    title: 'Layout/Page',
    component: Page,
    args: {
        width: 'fluid',
        gap: 0,
        base: 12,
    },
    argTypes: {
        as: {
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
    },
} as Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Page {...args} />;
    },
    args: {
        children: withLeftSidebar,
    },
    argTypes: {
        children: {
            name: 'page layout',
            options: [
                'noChildren',
                'withLeftSidebar',
                'withRightSidebar',
                'withScroll',
                'withStickyHeader',
                'onlyFooter',
                'withGrid',
            ],
            mapping: {
                noChildren,
                withLeftSidebar,
                withRightSidebar,
                withScroll,
                withStickyHeader,
                onlyFooter,
                withGrid,
            },
            control: {
                type: 'radio',
                labels: {
                    noChildren: 'No content',
                    withLeftSidebar: 'With left sidebar',
                    withRightSidebar: 'With right sidebar',
                    withScroll: 'With scroll',
                    withStickyHeader: 'With sticky Header',
                    onlyFooter: 'Without Content, just Footer',
                    withGrid: 'With grid inside',
                },
            },
        },
    },
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        docs: {
            story: {
                height: 333,
            },
        },
    },
};

export const WithGrid: Story = {
    render: args => {
        return <Page {...args} />;
    },
    args: {
        width: 999,
        gap: 16,
        children: withGrid,
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        gap: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        docs: {
            story: {
                height: 333,
            },
        },
    },
};
