import React from 'react';
import classes from './TextArea.module.css';

function TextArea(props) {
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
