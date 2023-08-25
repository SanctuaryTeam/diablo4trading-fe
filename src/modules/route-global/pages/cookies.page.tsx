import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import content from './cookies.page.md?raw';

const Content = styled('div')(({ theme }) => ({
    '*': {
        userSelect: 'text',
    },
    'a': {
        color: theme.palette.primary.main,
    },
}));

export const CookiePage: React.FC = () => {
    return (
        <Content>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </Content>
    );
};
