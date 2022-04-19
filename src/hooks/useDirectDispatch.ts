/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

/**
 * This hook wrpas the action creator in a function that directly dispatchs the action
 *
 * @argument {(...args: T) => void} actionCreator: Function that returns the action object
 * @returns {(...args: T) => void} function that directly dispatch the action created by actionCreator
 */
function useDirectDispatch<T extends any[]>(actionCreator: (...args: T) => void): (...args: T) => void {
  const dispatch = useDispatch();
  return useCallback((...actionArgs: T) => dispatch(actionCreator(...actionArgs)), [dispatch, actionCreator]);
}

export default useDirectDispatch;
