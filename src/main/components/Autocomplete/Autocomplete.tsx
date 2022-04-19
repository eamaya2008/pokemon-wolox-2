import React, { FunctionComponent, useEffect, useState } from 'react';
import List from './List';
import { noop } from 'lodash';

type AutocompleteProps = {
  suggestions: string[];
  inputClassName?: string;
  listClassName?: string;
  inputPlaceholder?: string;
  handleChange?: Function;
};

const Autocomplete: FunctionComponent<AutocompleteProps> = (props) => {
  const {
    suggestions = [],
    inputClassName = '',
    listClassName = '',
    inputPlaceholder = '',
    handleChange = noop,
  } = props;
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    handleChange(input);
  }, [input]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput: string = e.currentTarget.value;
    let unLinked: string[] = [];
    if (userInput.length > 3) {
      // Filter our suggestions that don't contain the user's input
      unLinked = suggestions.filter((suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
    }
    setInput(e.currentTarget.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (value: string) => {
    setFilteredSuggestions([]);
    setInput(value);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  return (
    <div className="list-wrapper">
      <input type="text" onChange={onChange} value={input} className={inputClassName} placeholder={inputPlaceholder} />
      {showSuggestions && input && (
        <List
          suggestions={filteredSuggestions}
          activeIndex={activeSuggestionIndex}
          onClick={onClick}
          className={listClassName}
        />
      )}
    </div>
  );
};

export default Autocomplete;
