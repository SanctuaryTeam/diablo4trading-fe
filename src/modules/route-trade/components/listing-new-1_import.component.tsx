import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const TYPE = 'image';

const Root = styled(Stack)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'dashed',
    padding: theme.spacing(4),
    '&.highlight': {
        backgroundColor: theme.palette.action.hover,
    },
}));
Root.defaultProps = {
    direction: 'column',
    spacing: 2,
    alignItems: 'center',
    justifyContent: 'center',
};

const Input = styled('input')(() => ({
    display: 'none',
}));

interface ListingNewImport {
    onImageImport: (image: string) => void;
    onItemImport: (image: string, item: Game.Item) => void;
}

export const ListingNewImport: React.FC<ListingNewImport> = ({
    onImageImport,
}) => {
    const { i18n } = useLingui();

    const root = React.useRef<HTMLDivElement>(null);
    const input = React.useRef<HTMLInputElement>(null);

    const importFile = React.useCallback((file: File) => {
        if (!file || file.type.indexOf(`${TYPE}/`) !== 0) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result as string;
            onImageImport(image);
        };
        reader.readAsDataURL(file);
    }, [onImageImport]);

    React.useLayoutEffect(() => {
        const target = root.current;
        if (!target) {
            return;
        }

        const handleAddClass = (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
            target.classList.add('highlight');
        };

        const handleRemoveClass = (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
            target.classList.remove('highlight');
        };

        const handleDrop = (event: DragEvent) => {
            handleRemoveClass(event);
            const file = event.dataTransfer?.files?.[0];
            importFile(file);
        };

        target.addEventListener('dragenter', handleAddClass);
        target.addEventListener('dragover', handleAddClass);
        target.addEventListener('dragleave', handleRemoveClass);
        target.addEventListener('drop', handleDrop);

        const handlePaste = (event: ClipboardEvent) => {
            const file = event.clipboardData?.files?.[0];
            importFile(file);
        };

        document.addEventListener('paste', handlePaste);

        return () => {
            target.removeEventListener('dragenter', handleAddClass);
            target.removeEventListener('dragover', handleAddClass);
            target.removeEventListener('dragleave', handleRemoveClass);
            target.removeEventListener('drop', handleDrop);

            document.removeEventListener('paste', handlePaste);
        };
    }, [importFile]);

    const handleUploadClick = () => {
        input.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        importFile(file);
    };

    return (
        <Root ref={root}>
            <Button
                onClick={handleUploadClick}
                variant='contained'
            >
                {t(i18n)`Upload Item Image`}
            </Button>
            <Input
                ref={input}
                accept={`${TYPE}/*`}
                onChange={handleImageChange}
                type='file'
            />
        </Root>
    );
};
