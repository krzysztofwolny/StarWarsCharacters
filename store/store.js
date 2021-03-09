import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import characters from './reducer';

const composeEnhancers = compose;

const store = () => createStore(characters, composeEnhancers(
    applyMiddleware(thunk)
));

export const wrapper = createWrapper(store);