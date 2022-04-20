import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import mainSaga from './main/mainSaga';
import rootMainReducer from './main/mainReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    main: rootMainReducer,
  },
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(mainSaga);

export default store;
