import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  FAQContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  FAQQuestion: {
    margin: '16px 0',
    cursor: 'pointer',
  },
  FAQAnswer: {
    marginBottom: '16px',
  },
  FAQButton: {
    marginTop: '8px',
    color: '#007bff', // Customize button color
    borderColor: '#007bff', // Customize button border color
  },
}));

interface FAQEntry {
  question: string;
  answer: string;
}

interface FAQPageProps {
  faqData: FAQEntry[];
}

const FAQPage: React.FC<FAQPageProps> = ({ faqData }) => {
  const classes = useStyles();
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  return (
    <div className={classes.FAQContainer}>
      {faqData.map((faq, index) => (
        <div key={index}>
          <h3 className={classes.FAQQuestion} onClick={() => toggleQuestion(index)}>
            {faq.question}
          </h3>
          {expandedQuestion === index && (
            <div className={classes.FAQAnswer}>
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
              <Button
                onClick={() => toggleQuestion(index)}
                variant="outlined"
                className={classes.FAQButton}
              >
                Hide Answer
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
