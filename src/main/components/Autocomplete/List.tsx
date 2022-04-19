import React, { FunctionComponent, memo } from 'react';
import { noop } from 'lodash';
import Suggestion from './Suggestion';

type SuggestionsListProps = {
  suggestions: string[];
  activeIndex: number;
  onClick: Function;
  className: string;
};

const SuggestionsList: FunctionComponent<SuggestionsListProps> = (props) => {
  const { suggestions = [], activeIndex = 0, onClick = noop, className = '' } = props;

  return (
    <>
      {suggestions.length > 0 && (
        <ul className={className}>
          {suggestions.map((suggestion, index) => (
            <Suggestion key={suggestion} suggestion={suggestion} isActive={index === activeIndex} onClick={onClick} />
          ))}
        </ul>
      )}
    </>
  );
};

export default SuggestionsList;
