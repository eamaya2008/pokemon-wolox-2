// Note: We separate the types from the modules to avoid dependency cicles.
import { State as MainState } from './main/mainReducer';

export type RootState = {
  main: MainState;
};
