import { Dialog as MuiDialog, dialogClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingDetail, ListingNew, Listings } from '../components';

const NEW_ID = 'new';

const Dialog = styled(MuiDialog)(({ theme }) => ({
    [`& .${dialogClasses.paper}`]: {
        maxWidth: theme.breakpoints.values.lg,
    },
}));

interface ListingsParam {
    id?: string;
}

export const ListingsPage: React.FC = () => {
    const navigate = useNavigate();

    const { id }: ListingsParam = useParams();

    const hasId = id?.length > 0;
    const setId = (id: string) => {
        navigate(hasId ? `./../${id}` : `./${id}`);
    };

    const handleNewClick = () => {
        setId(NEW_ID);
    };

    const handleCancel = () => {
        setId('');
    };

    const handlePublish = () => {
        setId('');
    };

    return (
        <>
            <Listings
                onNewClick={handleNewClick}
                onDetailClick={setId}
            />
            <Dialog open={hasId}>
                {hasId && (
                    id === NEW_ID
                        ? (
                            <ListingNew
                                onCancel={handleCancel}
                                onPublish={handlePublish}
                            />
                        )
                        : <ListingDetail id={id} onCancel={handleCancel} />
                )}
            </Dialog>
        </>
    );
};
