import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid as MuiDataGrid, GridCellParams, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { API } from '@sanctuaryteam/shared';
import React from 'react';
import reactStringReplace from 'react-string-replace';
import { ListingsDataGridRow as Row } from './listings-data-grid.types';

const DataGrid = styled(MuiDataGrid<Row>)(({ theme }) => ({
    '& .MuiDataGrid-row': {
        cursor: 'pointer',
        [`& > .MuiDataGrid-cell[data-field="${Common.getObjectField<Row>('itemTypeLine')}"]`]: {
            fontSize: 16,
            lineHeight: '20px',
            [`&.item-quality-${Game.ItemQuality.Common}`]: {
                color: theme.palette.item.common,
            },
            [`&.item-quality-${Game.ItemQuality.Magic}`]: {
                color: theme.palette.item.magic,
            },
            [`&.item-quality-${Game.ItemQuality.Rare}`]: {
                color: theme.palette.item.rare,
            },
        },
        '& .MuiDataGrid-cell': {
            padding: theme.spacing(0.5, 1.25),
        },
    },
    '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
        '&:focus, &:focus-within': {
            outline: 'none',
        },
    },
    '& .MuiDataGrid-virtualScroller': {
        minHeight: theme.spacing(4),
    },
}));

const Icon = styled('img')(() => ({
    width: 28,
    '&[data-large]': {
        width: 36,
    },
}));

const Affixes = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    color: theme.palette.item.text,
}));

const Line = styled('div')(() => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const Number = styled('span')(({ theme }) => ({
    color: theme.palette.item.number,
}));

interface ListingsDataGridProps {
    results: API.TradeSearchResult[];
    onResultClick: (id: string) => void;
}

export const ListingsDataGrid: React.FC<ListingsDataGridProps> = ({
    results,
    onResultClick,
}) => {
    const { i18n } = useLingui();
    const { language, affixes, translations } = Common.useAssets();

    const rows = React.useMemo(() => {
        return results.map<Row>(({ listing, item }) => ({
            id: listing.id,
            serverType: Game.ServerType.Seasonal,
            itemQuality: item.quality,
            itemType: item.type,
            // @ts-ignore
            itemTypeLine: Game.getItemTypeLine(item.variant, item.quality, item.type, language, translations),
            itemPower: item.power,
            itemAffixes: item.affixes
                ? item.affixes.map((affix) =>
                    Game.getItemAffixText(
                        affix.id,
                        language,
                        Game.AffixType.Basic,
                        -1,
                        -1,
                        affixes,
                        `${isNaN(affix.value ?? NaN) ? '?' : affix.value}`,
                    )
                )
                : [],
            expiresAt: listing.expiresAt ? new Date(listing.expiresAt) : undefined,
        }));
    }, [results, language, translations, affixes]);

    const columns: GridColDef<Row>[] = [
        {
            field: Common.getObjectField<Row>('serverType'),
            headerName: t(i18n)`Server`,
            width: 64,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<Row, Game.ServerType>) => (
                params.value && (
                    <Tooltip title={Game.getServerTypeText(params.value, language, translations)}>
                        <Icon
                            src={Common.GAME_SERVER_TYPE_ICONS[params.value]}
                            alt={t(i18n)`${Game.getServerTypeText(params.value, language, translations)}'s icon`}
                        />
                    </Tooltip>
                )
            ),
        },
        {
            field: Common.getObjectField<Row>('itemType'),
            headerName: t(i18n)`Type`,
            width: 56,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<Row, Game.ItemType>) => (
                params.value && (
                    <Tooltip title={Game.getItemTypeText(params.value, language, translations)}>
                        <Icon
                            src={Common.GAME_ITEM_TYPE_TOOLTIP_ICONS[params.value]}
                            alt={t(i18n)`${Game.getItemTypeText(params.value, language, translations)}'s icon`}
                            data-large
                        />
                    </Tooltip>
                )
            ),
        },
        {
            field: Common.getObjectField<Row>('itemTypeLine'),
            headerName: t(i18n)`Name`,
            width: 256,
        },
        {
            field: Common.getObjectField<Row>('itemPower'),
            type: 'number',
            headerName: t(i18n)`Power`,
            width: 64,
            align: 'right',
            headerAlign: 'right',
        },
        {
            field: Common.getObjectField<Row>('itemAffixes'),
            headerName: t(i18n)`Affixes`,
            width: 256,
            sortable: false,
            renderCell: (params: GridRenderCellParams<Row, string[]>) => (
                <Affixes>
                    {params.value && params.value.map((affix, index) => (
                        <Line key={index}>
                            {reactStringReplace(affix, /(\d+)/g, (value, index) => {
                                return <Number key={index}>{value}</Number>;
                            })}
                        </Line>
                    ))}
                </Affixes>
            ),
        },
        {
            field: Common.getObjectField<Row>('expiresAt'),
            type: 'dateTime',
            headerName: t(i18n)`Expires`,
            width: 128,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params: GridRenderCellParams<Row, Date>) => (
                params.value && (
                    <Tooltip title={i18n.date(params.value, { dateStyle: 'long', timeStyle: 'medium' })}>
                        <span>
                            <Common.Timer until={params.value.getTime()} />
                        </span>
                    </Tooltip>
                )
            ),
        },
    ];

    const handleRowClick = (event: { row: Row }) => {
        onResultClick(event.row.id);
    };

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            density='compact'
            getCellClassName={(params: GridCellParams<Row>) => `item-quality-${params.row.itemQuality}`}
            getRowHeight={() => 'auto'}
            getEstimatedRowHeight={() => 90}
            onRowClick={handleRowClick}
            slots={{ noRowsOverlay: () => t(i18n)`No listings. Create a new one!` }}
            disableColumnMenu
            disableRowSelectionOnClick
            hideFooter
        />
    );
};
