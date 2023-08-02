import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { Path, matchPath, useMatches } from 'react-router-dom';

interface NavPath extends Path {
    label: string;
}

interface NavTabsProps {
    paths: NavPath[]
}

export const NavTabs: React.FC<NavTabsProps> = ({
    paths
}) => {
    const navigate = useNavigate();
    const matches = useMatches();

    const tabValue = Math.max(0, paths.findIndex(p => {
        const match = matchPath({
            path: p.pathname,
            end: false
        }, matches[matches.length - 1].pathname);
        return match !== null;
    }));
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        navigate(paths[newValue]);
    };

    return (
        <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ pb: 1 }}
        >
            {paths.map(p => (
                <Tab key={p.pathname} label={p.label} />
            ))}
        </Tabs>
    )
}