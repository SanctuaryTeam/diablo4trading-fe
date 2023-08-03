import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import React from 'react';
import { useResolvedPath } from 'react-router';

export const Nav: React.FC = () => {
    const { i18n } = useLingui();

    const searchPath = useResolvedPath('./search');
    const listingsPath = useResolvedPath('./listings');

    const paths = [
        { ...searchPath, label: t(i18n)`Search for Items` },
        { ...listingsPath, label: t(i18n)`My Listings` },
    ];

    return <Common.NavTabs paths={paths} />;
};
