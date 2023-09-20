import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import {
    Autocomplete,
    autocompleteClasses,
    Popper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { ListChildComponentProps, VariableSizeList } from 'react-window';

const LISTBOX_PADDING = 8; // px

function renderRow(
    props: ListChildComponentProps<
        [React.HTMLAttributes<HTMLLIElement>, { id: string; label: string }][]
    >,
) {
    const { data, index, style } = props;
    const [componentProps, option] = data[index];
    const inlineStyle = {
        ...style,
        top: (style.top as number) + LISTBOX_PADDING,
    };

    return (
        <Typography
            component='li'
            {...componentProps}
            noWrap
            style={inlineStyle}
        >
            {option.label}
        </Typography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return (
        <div
            ref={ref}
            {...props}
            {...outerProps}
        />
    );
});
OuterElementType.displayName = 'OuterElementType';

function useResetCache(data: unknown) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
    function ListboxComponent(props, ref) {
        const { children, ...other } = props;
        const itemData: React.ReactElement[] = [];
        (children as React.ReactElement[]).forEach(
            (item: React.ReactElement & { children?: React.ReactElement[] }) => {
                itemData.push(item);
                itemData.push(...(item.children || []));
            },
        );

        const theme = useTheme();
        const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
            noSsr: true,
        });
        const itemCount = itemData.length;
        const itemSize = smUp ? 36 : 48;

        const getChildSize = () => {
            return itemSize;
        };

        const getHeight = () => {
            if (itemCount > 8) {
                return 8 * itemSize;
            }
            return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
        };

        const gridRef = useResetCache(itemCount);

        return (
            <div ref={ref}>
                <OuterElementContext.Provider value={other}>
                    <VariableSizeList
                        itemData={itemData}
                        height={getHeight() + 2 * LISTBOX_PADDING}
                        width='100%'
                        ref={gridRef}
                        outerElementType={OuterElementType}
                        innerElementType='ul'
                        itemSize={() => getChildSize()}
                        overscanCount={5}
                        itemCount={itemCount}
                    >
                        {renderRow}
                    </VariableSizeList>
                </OuterElementContext.Provider>
            </div>
        );
    },
);

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});

interface ItemAffixInputProps {
    value?: Game.AffixId;
    onChange: (value: Game.AffixId) => void;
    label?: string;
    type?: Game.AffixType;
    placeholder?: string;
    disabled?: boolean;
    language?: Game.Language;
}

export const ItemAffixInput: React.FC<ItemAffixInputProps> = ({
    value,
    onChange,
    label,
    type = Game.AffixType.Basic,
    placeholder = '#',
    disabled,
    language: formLanguage,
}) => {
    const { i18n } = useLingui();
    const { language: assetsLanguage, affixes } = Common.useAssets();
    const language = formLanguage ?? assetsLanguage;

    const { options, selected } = React.useMemo(() => {
        const options = Object
            .keys(affixes.definitions[type])
            .map((id) => ({
                id,
                label: Game.getItemAffixText(
                    id,
                    language,
                    type,
                    -1,
                    -1,
                    affixes,
                    placeholder,
                ),
            }));
        let selected = value === undefined ? null : options.find((o) => o.id === value);
        if (selected === undefined) {
            options.push({
                id: value,
                label: t(i18n)`Unknown: ${value}`,
            });
            selected = options[options.length - 1];
        }
        return { options, selected };
    }, [affixes, type, value, language, placeholder, i18n]);

    return (
        <Autocomplete
            disableListWrap
            PopperComponent={StyledPopper}
            ListboxComponent={ListboxComponent}
            value={selected}
            options={options}
            filterOptions={(options, { inputValue }) =>
                inputValue.length >= 1
                    ? matchSorter(options, inputValue, {
                        keys: ['label'],
                    })
                    : options}
            onChange={(_, option) => onChange(option?.id)}
            renderInput={(params) => <TextField {...params} label={label} />}
            renderOption={(props, option, state) => [props, option, state.index] as React.ReactNode}
            fullWidth
            disabled={disabled}
        />
    );
};
