import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux";
import axios from 'axios'
import {io} from 'socket.io-client'

import './index.css';

const socket = io("http://localhost:5000");
window.socket = socket

const elem = document.createElement('div')
document.body.insertBefore(elem, document.getElementsByTagName('script')[0])


// initialize axios default endpoint for api request
axios.defaults.baseURL = process.env.API_URL || 'http://localhost:5000'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    elem
);

