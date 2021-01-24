import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/';
import {Provider} from 'react-redux'
import ScrollToTop from './shared/ScrollToTop';
import { ToastContainer } from 'react-toastify';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));


// const app = (
//   <Provider store={store}>
//     <BrowserRouter>
//     <ScrollToTop/>
//     <App />
//     </BrowserRouter>
//   </Provider>
// )


ReactDOM.render(
  // <React.StrictMode>
   
// </React.StrictMode>, *
<React.StrictMode>
<Provider store={store}>
    <BrowserRouter>
    <ScrollToTop/>
    <ToastContainer />
    <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>, 
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
