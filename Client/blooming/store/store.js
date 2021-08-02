  
import { createStore, combineReducers } from 'redux';
import cart from './reducers/cart';

const rootReducer = combineReducers({
    cart: cart
})

const configureStore = () => createStore(rootReducer);

export default configureStore;