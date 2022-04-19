import React, { FunctionComponent } from 'react';
import { noop } from 'lodash';
import { firstLetterToUpperCase } from '../../utils/functions';

type SuggestionsProps = {
  suggestion: string;
  isActive: boolean;
  onClick: Function;
};

const Suggestion: FunctionComponent<SuggestionsProps> = (props) => {
  const { suggestion = '', isActive = false, onClick = noop } = props;
  let className;

  // Flag the active suggestion with a class
  if (isActive) {
    className = 'active';
  }

  function doOnClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    if (onClick != null) {
      onClick(e.currentTarget.innerText);
    }
  }

  return (
    <li className={className} onClick={doOnClick}>
      {firstLetterToUpperCase(suggestion)}
    </li>
  );
};

export default Suggestion;
