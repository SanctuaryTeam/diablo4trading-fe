import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import React, { useCallback } from 'react';

interface TimerProps {
    until: number;
}

export const Timer: React.FC<TimerProps> = ({
    until,
}) => {
    const { i18n } = useLingui();

    const relative = React.useMemo(() => {
        return new Intl.RelativeTimeFormat(i18n.locale, { style: 'narrow' });
    }, [i18n.locale]);

    const format = useCallback(() => {
        const now = Date.now();
        const diff = until - now;
        if (diff <= 0) {
            return t(i18n)`Expired`;
        }
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return relative.format(days, 'day');
        }
        if (hours > 0) {
            return relative.format(hours, 'hour');
        }
        if (minutes > 0) {
            return relative.format(minutes, 'minute');
        }
        return relative.format(seconds, 'second');
    }, [i18n, relative, until]);

    const [formatted, setFormatted] = React.useState(format());

    React.useEffect(() => {
        const interval = setInterval(() => {
            const formatted = format();
            setFormatted(formatted);
        }, 1000 * 5);
        setFormatted(format());
        return () => clearInterval(interval);
    }, [format]);

    return <>{formatted}</>;
};
