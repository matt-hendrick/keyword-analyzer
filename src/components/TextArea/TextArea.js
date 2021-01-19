import React from 'react';
import classes from './TextArea.module.css';

function TextArea(props) {
  window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
  });

  let textAreaElement = null;
  const textAreaClasses = [classes.TextAreaElement];
  textAreaElement = (
    <textarea
      className={textAreaClasses.join(' ')}
      type={props.elementType}
      value={props.value}
      onChange={props.changed}
      placeholder={props.placeholder}
      rows={props.rows}
    />
  );

  return <div className={classes.TextArea}>{textAreaElement}</div>;
}

export default TextArea;
