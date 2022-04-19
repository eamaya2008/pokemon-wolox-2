import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import mainSaga from './main/mainSaga';
import rootMainReducer from './main/mainReducer';

// Set up redux dev tools only if we are in dev
const reduxDevTools = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    main: rootMainReducer,
  },
  devTools: reduxDevTools,
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(mainSaga);

export default store;
