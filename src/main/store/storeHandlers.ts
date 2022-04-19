/* eslint-disable @typescript-eslint/no-explicit-any */
import { Immutable, produce } from 'immer';

/**
 * Actions
 */

/**
 * Redux action
 *
 * @typeParam T extends string - Its the action's type, used to discriminate the action from others.
 * @typeParam P - JSON object representing the action's payload.
 */
type Action<T extends string, P> = {
  type: T;
  payload?: P;
};

/**
 * A function that takes U parameters and returns an Action with type T, and maybe a payload P.
 * Alongside the function comes the field type used for discriminating the action creator.
 *
 * @typeParam T extends string - Action creator's type
 * @typeParam U extends any[] - Action creator's function arguments
 * @typeParam P - JSON object representing the action's payload.
 * @see Action
 */
type ActionCreator<T extends string, U extends any[], P> = ((...args: U) => Action<T, P>) & { type: T };

/**
 * Extracts the payload type from an ActionCreator using the type T, function arguments U.
 *
 * @typeParam T extends string - Action creator's type
 * @typeParam U extends any[] - Action creator's function parameters
 * @typeParam A - Action creator we want to extract its payload.
 * @returns Action creator A payload
 * @see ActionCreator
 */
type FullActionCreatorPayload<
  T extends string,
  U extends any[],
  A extends ActionCreator<T, U, any>,
> = A extends ActionCreator<T, U, infer P> ? P : unknown;

/**
 * Extracts the payload type from an ActionCreator ignoring the type T, function arguments U.
 *
 * @typeParam A - Action creator we want to extract its payload.
 * @returns Action creator A payload
 * @see ActionCreator
 */
export type ActionCreatorPayload<A extends ActionCreator<any, any, any>> = A extends ActionCreator<any, any, infer P>
  ? P
  : unknown;

/**
 * Creates a Redux action
 *
 * @param {T extends string} type - Action type.
 * @param {P extends object} payload - Action Payload.
 * @returns {Action<T,P>} Redux action.
 * @see Action
 */
function createAction<T extends string, P>(type: T, payload?: P): Action<T, P> {
  return { type, payload };
}

/**
 * Creates an Action creator. An action creator is a function that returns an Action with the same
 * type as the ActionCreator and the payload returned by the creator function.
 *
 * @param {T extends string} type - ActionCreator type.
 * @param {(U extends any[]) => P} creator - (Optional) a function that returns action Payload
 * @returns A function that creates an action with same type as the ActionCreator (type arg) and
 * the payload returned by the creator function.
 */
// eslint-disable-next-line max-len
export function createActionCreator<T extends string, U extends any[], P extends object>(
  type: T,
  creator?: (...args: U) => P,
): ActionCreator<T, U, P> {
  const actionCreator = (...actionArgs: U) => createAction(type, creator != null ? creator(...actionArgs) : undefined);
  return Object.assign(actionCreator, { type });
}

/**
 * Reducers
 */

/**
 * Represents a reducer handler. A function that given an state S and a payload
 * P performs changes (effects) in the state.
 * @typeParam S - Reducer state
 */
type ReducerHandler<S> = (state: S, actionPayload?: any) => void;

/**
 * Dictionary that maps an Action type with its corresponding handler.
 * @typeParam S - Reducer state
 * @see Action
 */
interface ReducerHanlders<S> {
  [key: string]: ReducerHandler<S>;
}

/**
 * Creates a reducer for the state S. When we handle the state changes through this function we
 * never mutate the state. Immutability is achieved using the immer library.
 *
 * @typeParam S - Reducer state
 * @param initialState - state's initial values
 * @returns a Redux reducer for the state S
 *
 * @example
 * ```
 * import { toggle, changeLabel } from './actions';
 *
 * type State = { toggled: bool, label: string, color: string; };
 * const initialState = { toggled: false, label: 'not toggled', color: '#ff0012' };
 *
 * function handleChangeColor(state: State, { newColor }: ActionCreatorPayload<typeof changeColor>) {
 *  if (newColor === '#ffffff') {
 *    state.color = 'white';
 *  } else if (newColor === '#000000') {
 *    state.color = 'black';
 *  } else {
 *    state.color = newColor;
 *  }
 * }
 *
 * const reducer = createReducer(initialState)
 *  .handleAction(toggle, (s) => { s.toggled = !s.toggled; })
 *  .handleAction(changeLabel, (s, { label }) => { s.label = label; })
 *  .handleAction(changeColor, handleChangeColor);
 * ```
 */
export function createReducer<S>(initialState: Immutable<S>, initialHandlers: ReducerHanlders<S> = {}) {
  /**
   * Here we store the action handlers. The key are the action's types and the value a function
   * to handle that action
   */
  const handlers: ReducerHanlders<S> = initialHandlers;

  /**
   * Adds an action handler to the reducer.
   *
   * @param actionCreator function that will create the actions processed by the handler.
   * @param handler function that handles the action created by actionCreator.
   */
  // eslint-disable-next-line max-len
  function handleAction<T extends string, U extends any[], P>(
    actionCreator: ActionCreator<T, U, P>,
    handler: (s: S, p: FullActionCreatorPayload<T, U, typeof actionCreator>) => void,
  ) {
    return createReducer(initialState, {
      ...handlers,
      [actionCreator.type]: handler,
    });
  }

  /**
   * Creates the reducer with immutability support and the action handlers contained in handlers.
   */
  function rootReducer<T extends string>() {
    return produce((state: S, action: Action<T, unknown>) => {
      if (action.type in handlers) {
        const actionHandler = handlers[action.type];
        actionHandler(state, action.payload);
      }
    }, initialState);
  }

  return Object.assign(rootReducer(), {
    handlers,
    handleAction,
  });
}
