/** @license WBR
 * sw.js
 * 
 * Copyright (c) Pomatsuev Stanislav
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';

import './sass/main.scss';

function App(props) {
  return(
    <div className="logo">
      <h4>Hello from {props.name}!</h4>
      <p className="small-text">
        Just change <span>index.js</span> into <span>src</span> folder.
      </p>
    </div>
  );
};

render(<App name="WBR"/>, document.getElementById('react'));


/*
*PWA - service worker
* uncomment this code after develop.
* webpack-dev-server HOT RELOAD will not work
* because all pages will be get from cache
*
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then((sw)=>console.log('Service worker succsesfuly registred:', sw))
    .catch(({message, code})=>console.log('Dont registred:', code ,message));
}
*/
