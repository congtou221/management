import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import reducer from './reducer';
import DevTools from './devTools';

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducer', () =>
      {return store.replaceReducer(require('./reducer').default)}
    );
  }

  return store;
}
// var enhancer = compose(DevTools.instrument());
// var store = createStore(reducer);

export default configureStore();
