import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import React from 'react';
import { useResolvedPath } from 'react-router';

interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    children
}) => {
    const { i18n } = useLingui();

    const searchPath = useResolvedPath('./search');
    const listingsPath = useResolvedPath('./listings');

    const paths = [
        { ...searchPath, label: t(i18n)`Search for items` },
        { ...listingsPath, label: t(i18n)`My Listings` },
    ];

    return (
        <>
            <Common.NavTabs paths={paths} />
            {children}
        </>
    )
}