import {useCallback, useRef, useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Picture, Button} from '@/lib';

import {
    TransitionFade,
    TransitionSlideBottom,
    TransitionSlideTop,
    TransitionSlideRight,
    TransitionSlideLeft,
} from './index.ts';

const meta = {
    title: 'Components/Transitions',
    component: TransitionFade,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        unmountNode: true,
        onEnter: fn(),
        onExit: fn(),
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
        nodeRef: {
            table: {
                disable: true,
            },
        },
        onEnter: {
            table: {
                disable: true,
            },
        },
        onExit: {
            table: {
                disable: true,
            },
        },
        show: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof TransitionFade>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fade: Story = {
    render: args => {
        const ref = useRef(null);
        const [visible, setVisible] = useState(true);
        const handleClick = useCallback(() => {
            setVisible(!visible);
        }, [visible]);
        const transitionName = visible ? 'exit' : 'enter';
        return (
            <div>
                <div style={{marginBottom: 32}}>
                    <Button onClick={handleClick}>Trigger {transitionName} transition</Button>
                </div>
                <TransitionFade {...args} show={visible} nodeRef={ref}>
                    <Picture
                        ref={ref}
                        src="https://picsum.photos/333/333"
                        width={333}
                        height={333}
                        alt="Image description"
                    />
                </TransitionFade>
            </div>
        );
    },
    args: {},
};

export const SlideBottom: Story = {
    render: args => {
        const ref = useRef(null);
        const [visible, setVisible] = useState(true);
        const handleClick = useCallback(() => {
            setVisible(!visible);
        }, [visible]);
        const transitionName = visible ? 'exit' : 'enter';
        return (
            <div style={{height: 666}}>
                <div style={{marginBottom: 32}}>
                    <Button onClick={handleClick}>Trigger {transitionName} transition</Button>
                </div>
                <TransitionSlideBottom {...args} show={visible} nodeRef={ref}>
                    <Picture
                        ref={ref}
                        src="https://picsum.photos/333/333"
                        width={333}
                        height={333}
                        alt="Image description"
                    />
                </TransitionSlideBottom>
            </div>
        );
    },
    args: {
        show: true,
    },
};

export const SlideTop: Story = {
    render: args => {
        const ref = useRef(null);
        const [visible, setVisible] = useState(true);
        const handleClick = useCallback(() => {
            setVisible(!visible);
        }, [visible]);
        const transitionName = visible ? 'exit' : 'enter';
        return (
            <div style={{height: 666}}>
                <div style={{marginBottom: 32}}>
                    <Button onClick={handleClick}>Trigger {transitionName} transition</Button>
                </div>
                <TransitionSlideTop {...args} show={visible} nodeRef={ref}>
                    <Picture
                        ref={ref}
                        src="https://picsum.photos/333/333"
                        width={333}
                        height={333}
                        alt="Image description"
                    />
                </TransitionSlideTop>
            </div>
        );
    },
    args: {
        show: true,
    },
};

export const SlideRight: Story = {
    render: args => {
        const ref = useRef(null);
        const [visible, setVisible] = useState(true);
        const handleClick = useCallback(() => {
            setVisible(!visible);
        }, [visible]);
        const transitionName = visible ? 'exit' : 'enter';
        return (
            <div style={{height: 666}}>
                <div style={{marginBottom: 32}}>
                    <Button onClick={handleClick}>Trigger {transitionName} transition</Button>
                </div>
                <TransitionSlideRight {...args} show={visible} nodeRef={ref}>
                    <Picture
                        ref={ref}
                        src="https://picsum.photos/333/333"
                        width={333}
                        height={333}
                        alt="Image description"
                    />
                </TransitionSlideRight>
            </div>
        );
    },
    args: {
        show: true,
    },
};

export const SlideLeft: Story = {
    render: args => {
        const ref = useRef(null);
        const [visible, setVisible] = useState(true);
        const handleClick = useCallback(() => {
            setVisible(!visible);
        }, [visible]);
        const transitionName = visible ? 'exit' : 'enter';
        return (
            <div style={{height: 666}}>
                <div style={{marginBottom: 32}}>
                    <Button onClick={handleClick}>Trigger {transitionName} transition</Button>
                </div>
                <TransitionSlideLeft {...args} show={visible} nodeRef={ref}>
                    <Picture
                        ref={ref}
                        src="https://picsum.photos/333/333"
                        width={333}
                        height={333}
                        alt="Image description"
                    />
                </TransitionSlideLeft>
            </div>
        );
    },
    args: {
        show: true,
    },
};
