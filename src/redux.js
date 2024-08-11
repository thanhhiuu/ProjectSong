import { thunk } from 'redux-thunk';
import rootReducers from './store-redux/reducers/rootReducers';

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

const reduxConfig = () => {
  const store = createStore(rootReducers, applyMiddleware(thunk));
  const persistor = persistStore(store);
  // console.log('store', store, 'per', persistor);
  return { store, persistor };
};

export default reduxConfig;
