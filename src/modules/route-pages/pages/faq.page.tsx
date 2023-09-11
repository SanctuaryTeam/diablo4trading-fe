import * as enEs from '@assets/faq.page.enEs.md?raw';
import * as enUs from '@assets/faq.page.enUs.md?raw';
import { Redux } from '@modules/redux';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
const Content = styled('div')(({ theme }) => ({
    '*': {
        userSelect: 'text',
    },
    'a': {
        color: theme.palette.primary.main,
    },
}));

export const FaqPage: React.FC = () => {
    const [content, setContent] = React.useState('');
    const language = useSelector(Redux.UserSelectors.getLanguage);

    React.useEffect(() => {
        const loadMarkdown = async () => {
            switch (language) {
                case Redux.UserLanguage.English:
                default:
                    setContent(enUs.default);
                    break;
                case Redux.UserLanguage.Spanish:
                    setContent(enEs.default);
                    break;
            }
        };

        loadMarkdown();
    }, [language]);

    return (
        <Content>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </Content>
    );
};
