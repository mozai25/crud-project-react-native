/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import {LogBox} from 'react-native';
import App from './windows/App';
import Info from './windows/Info';
import AddProduct from './windows/AddProduct';

import {Provider} from 'react-redux';
import {createStore, Store} from 'redux';
import messagesReducer from './redux/reducers';
import React from "react";
LogBox.ignoreAllLogs(true);

const store: Store = createStore(messagesReducer);

Navigation.registerComponent('test1.home', () => props => (
    <Provider store={store}>
        <App {...props} />
    </Provider>
), () => App);
Navigation.registerComponent('test1.info', () => props => (
    <Provider store={store}>
        <Info {...props} />
    </Provider>
), () => Info);
Navigation.registerComponent('test1.add', () => props => (
    <Provider store={store}>
        <AddProduct {...props} />
    </Provider>
), () => AddProduct);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'test1.home',
               options: {
                   topBar: {
                     title: {
                       text: 'Home Page',
                     }
                   }
                 }
             }
           }
         ]
       }
     }
  });
});