import type {FC, MutableRefObject, ReactNode} from 'react';
import {useState} from 'react';

import {useEventListener} from '@/internal/hooks/useEventListener.ts';
import {useIsFirstRender} from '@/internal/hooks/useIsFirstRender.tsx';
import {useSafeLayoutEffect} from '@/internal/hooks/useSafeLayoutEffect.ts';

export type Props = {
    /** Control transition cycles. true starts enter cycle, false - exit. */
    show?: boolean;
    children?: ReactNode;
    /**
     * React reference to wrapper HTMLElement, transition CSS classes will be applied to
     * @example
     * const ref = useRef();
     * <Transition nodeRef={ref}>
     *     <div ref={ref}>{children}</div>
     *  </Transition>
     */
    nodeRef: MutableRefObject<HTMLElement | null>;
    /** CSS class to apply when exit transition starts */
    exitClassName?: string;
    /** CSS class to apply when exit transition is over */
    exitDoneClassName?: string;
    /** CSS class to apply when enter transition starts */
    enterClassName?: string;
    /** CSS class to apply when enter transition is over */
    enterDoneClassName?: string;
    /** Define if Transition component should unmount children according to show prop */
    unmountNode?: boolean;
    /** Callback triggers when exit transition is over */
    onExit?: () => void;
    /** Callback triggers when enter transition is over */
    onEnter?: () => void;
};

export const Transition: FC<Props> = ({
    show = false,
    children,
    exitClassName = 'transition-exit',
    exitDoneClassName = 'transition-exit-done',
    enterClassName = 'transition-enter',
    enterDoneClassName = 'transition-enter-done',
    nodeRef,
    unmountNode,
    onExit = () => {},
    onEnter = () => {},
}) => {
    const isFirstRender = useIsFirstRender();

    const [shouldRender, setRender] = useState(show);

    useSafeLayoutEffect(() => {
        show && setRender(show);
    }, [show]);

    useSafeLayoutEffect(() => {
        if (show) {
            nodeRef.current?.classList.add(enterClassName);
            nodeRef.current?.classList.remove(exitClassName);
            nodeRef.current?.classList.remove(exitDoneClassName);
        } else {
            nodeRef.current?.classList.add(exitClassName);
            nodeRef.current?.classList.remove(enterClassName);
            nodeRef.current?.classList.remove(enterDoneClassName);
        }
    }, [enterClassName, exitClassName, nodeRef, show, shouldRender, isFirstRender]);

    const handleAnimationEnd = () => {
        if (show && shouldRender) {
            onEnter();
            nodeRef.current?.classList.remove(enterClassName);
            nodeRef.current?.classList.add(enterDoneClassName);
        } else if (shouldRender) {
            onExit();
            nodeRef.current?.classList.remove(exitClassName);
            nodeRef.current?.classList.add(exitDoneClassName);
            setRender(false);
        }
    };

    useEventListener('animationend', handleAnimationEnd, nodeRef.current);

    return (shouldRender || !unmountNode) && children;
};
