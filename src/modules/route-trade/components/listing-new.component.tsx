import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Common } from '@modules/common';
import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import { ListingNewImport } from './listing-new-1_import.component';
import { ListingNewParams } from './listing-new-2_params.component';
import { isListingNewParamsFormValid } from './listing-new-2_params.helper';
import { ListingNewParamsFormValue } from './listing-new-2_params.types';
import { ListingNewItem } from './listing-new-3_item.component';
import { isListingNewItemFormValid } from './listing-new-3_item.helper';
import { ListingNewItemFormValue } from './listing-new-3_item.types';

enum Step {
    Import,
    Params,
    Item,
    Listing,
}

const STEP_ORDER = [
    Step.Import,
    Step.Params,
    Step.Item,
    Step.Listing,
];

interface ListingNewProps {
    onCancel: () => void;
    onPublish: () => void;
}

export const ListingNew: React.FC<ListingNewProps> = ({
    onCancel,
    onPublish,
}) => {
    const { i18n } = useLingui();

    // const language = useSelector(Redux.UserSelectors.getLanguage);
    // const serverType = useSelector(Redux.UserSelectors.getServerType);

    const [step, setStep] = React.useState(Step.Import);
    const [loading, setLoading] = React.useState(false);

    const [image, setImage] = React.useState('');

    const [paramsForm, setParamsForm] = React.useState<ListingNewParamsFormValue>({});
    const [itemForm, setItemForm] = React.useState<ListingNewItemFormValue>({});

    const handleImageImport = (image: string) => {
        setImage(image);
        // TODO: could set language and server type based on last context
        setStep(Step.Params);
    };

    const handleItemImport = (image: string, item: Game.Item) => {
        setImage(image);
        // TODO: could set server type based on last context
        setParamsForm({ language: item.language });
        setItemForm({
            variant: item.variant,
            quality: item.quality,
            type: item.type,
            power: item.power,
            requiredLevel: item.requiredLevel,
            classRestriction: item.classRestriction,
            inherentAffixes: item.inherentAffixes?.map((affix) => ({ id: affix.id })),
            affixes: item.affixes?.map((affix) => ({ id: affix.id })),
            socketType: item.socketType,
        });
        setStep(Step.Params);
    };

    const handleNext = () => {
        switch (step) {
            case Step.Params:
                if (itemForm.type === undefined) {
                    // call ocr
                    setLoading(true);
                    window.setTimeout(() => {
                        setLoading(false);
                        setStep(Step.Item);
                    }, 1000 * 1.5);
                } else {
                    setStep(Step.Item);
                }
                break;
            case Step.Listing:
                // publish
                onPublish();
                break;
            default:
                {
                    const stepIndex = STEP_ORDER.indexOf(step);
                    const nextStep = STEP_ORDER[stepIndex + 1];
                    setStep(nextStep);
                }
                break;
        }
    };

    if (loading) {
        return <Common.Spinner />;
    }

    const isValid = (() => {
        switch (step) {
            case Step.Import:
                return undefined;
            case Step.Params:
                return isListingNewParamsFormValid(paramsForm);
            case Step.Item:
                return isListingNewItemFormValid(itemForm, paramsForm.serverType);
            case Step.Listing:
                return true;
        }
    })();

    return (
        <Box p={2}>
            <Stack height='100%' gap={1}>
                {step === Step.Import && (
                    <ListingNewImport
                        onImageImport={handleImageImport}
                        onItemImport={handleItemImport}
                    />
                )}
                {step === Step.Params && (
                    <ListingNewParams
                        value={paramsForm}
                        onChange={setParamsForm}
                    />
                )}
                {step === Step.Item && (
                    <ListingNewItem
                        value={itemForm}
                        onChange={setItemForm}
                        image={image}
                        language={paramsForm.language}
                        serverType={paramsForm.serverType}
                    />
                )}
                {step === Step.Listing && <div>TODO</div>}
                <Stack
                    direction='row'
                    justifyContent='flex-end'
                    spacing={1}
                >
                    <Button
                        onClick={onCancel}
                        color='secondary'
                    >
                        {t(i18n)`Cancel`}
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={!isValid}
                        variant='contained'
                    >
                        {step === STEP_ORDER[STEP_ORDER.length - 1]
                            ? t(i18n)`Publish`
                            : t(i18n)`Next`}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};
