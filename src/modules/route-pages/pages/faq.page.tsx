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
            let contentPath = '';
            switch (language) {
                case Redux.UserLanguage.English:
                default:
                    contentPath = './faq.page.enUs.md?raw';
                    break;
                case Redux.UserLanguage.Spanish:
                    contentPath = './faq.page.enEs.md?raw';
                    break;
            }

            try {
                const markdownModule = await import(contentPath);
                setContent(markdownModule.default);
            } catch (error) {
                console.log('Failed to load markdown:', error);
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
