import React, { useEffect, useRef } from 'react';

interface ResizeProps {
    onResize: (width: number, height: number) => void;
    displayBlock?: boolean;
    offsetWidth?: number;
    offsetHeight?: number;
    children?: React.ReactNode;
}

export const Resize: React.FC<ResizeProps> = ({
    onResize,
    displayBlock,
    offsetWidth = 0,
    offsetHeight = 0,
    children,
}) => {
    const element = useRef<HTMLElement>();
    const resizer = useRef(
        new ResizeObserver(() => {
            if (!element.current) {
                return;
            }
            let { offsetWidth: width, offsetHeight: height } = element.current;
            width += offsetWidth;
            height += offsetHeight;
            onResize(width, height);
        }),
    );

    useEffect(() => {
        const tmp = resizer.current;
        return () => {
            if (element.current) {
                tmp?.unobserve(element.current);
            }
            tmp?.disconnect();
        };
    }, []);

    const setElement = (
        ref: HTMLElement,
    ) => {
        if (element.current) {
            resizer.current.unobserve(element.current);
        }
        element.current = ref;
        if (ref) {
            let { offsetWidth: width, offsetHeight: height } = element.current;
            width += offsetWidth;
            height += offsetHeight;
            onResize(width, height);
            resizer.current.observe(ref);
        }
    };

    return (
        <div
            ref={setElement}
            style={{
                display: displayBlock ? 'block' : 'inline-block',
            }}
        >
            {children}
        </div>
    );
};
