import React, { useState } from 'react';
import natural from 'natural';

import classes from './KeywordAnalyzer.module.css';

import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';

function KeywordAnalyzer() {
  const [leftTextArea, setLeftTextArea] = useState('');
  const [rightTextArea, setRightTextArea] = useState('');
  const [leftResults, setLeftResults] = useState(null);
  const [rightResults, setRightResults] = useState(null);

  natural.PorterStemmer.attach();
  const tokenizer = new natural.WordTokenizer();

  const placeholderFunction = (leftTextArea, rightTextArea) => {
    const rightToken = tokenizer.tokenize(rightTextArea);
    const leftToken = tokenizer.tokenize(leftTextArea);

    let rightObj = {};
    let leftObj = {};
    rightToken.forEach((item) => {
      if (rightObj[item.toLowerCase()]) {
        rightObj[item.tokenizeAndStem()] = rightObj[item.tokenizeAndStem()] + 1;
      } else {
        rightObj[item.tokenizeAndStem()] = 1;
      }
    });
    setRightResults(
      Object.entries(rightObj)
        .filter((item) => item[0].length > 2 && item[1] > 1)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
    );
    leftToken.forEach((item) => {
      if (leftObj[item.toLowerCase()]) {
        leftObj[item.tokenizeAndStem()] = leftObj[item.tokenizeAndStem()] + 1;
      } else {
        leftObj[item.tokenizeAndStem()] = 1;
      }
    });
    setLeftResults(
      Object.entries(leftObj)
        .filter((item) => item[0].length > 2 && item[1] > 1)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
    );
  };

  const analyzeKeywordHandler = (event) => {
    event.preventDefault();

    if (!leftTextArea || !rightTextArea) {
      alert('please enter text into both fields');
    } else placeholderFunction(leftTextArea, rightTextArea);
  };

  const leftTextAreaChangedHandler = (event) => {
    const updatedLeftTextArea = event.target.value;
    setLeftTextArea(updatedLeftTextArea);
  };

  const rightTextAreaChangedHandler = (event) => {
    const updatedRightTextArea = event.target.value;
    setRightTextArea(updatedRightTextArea);
  };

  window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
  });

  return (
    <div className={classes.KeywordAnalyzer}>
      <h1>Keyword Analyzer</h1>
      <form onSubmit={analyzeKeywordHandler}>
        <div className={classes.TextAreas}>
          <TextArea
            className={classes.TextArea}
            placeholder="Enter your text here"
            value={leftTextArea}
            changed={(event) => leftTextAreaChangedHandler(event)}
            rows={25}
            required
          />
          <TextArea
            className={classes.TextArea}
            placeholder="Enter text to compare with"
            value={rightTextArea}
            changed={(event) => rightTextAreaChangedHandler(event)}
            rows={25}
            required
          />
        </div>
        <Button>Analyze Keywords</Button>
      </form>
      {rightResults && leftResults ? (
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ width: '50%' }}>
            <h3>Left Text Keywords</h3>
            {leftResults.map((word, index) => {
              return (
                <span
                  key={word + index}
                  style={{ padding: '5px', display: 'flex' }}
                >
                  {`Keyword #${index + 1}:`}
                  <strong style={{ paddingLeft: '5px' }}>{word[0]}</strong>
                  {`, ${word[1]} ${word[0].length > 1 ? 'times' : 'time'}`}
                </span>
              );
            })}
          </div>
          <div style={{ width: '50%' }}>
            <h3>Right Text Keywords</h3>
            {rightResults.map((word, index) => {
              return (
                <span
                  key={word + index}
                  style={{ padding: '5px', display: 'flex' }}
                >
                  {`Keyword #${index + 1}:`}
                  <strong style={{ paddingLeft: '5px' }}>{word[0]}</strong>
                  {`, ${word[1]} ${word[0].length > 1 ? 'times' : 'time'}`}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default KeywordAnalyzer;
