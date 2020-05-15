import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import './styles/styles.scss';

render(<App name="WBR" />, document.querySelector('#react'));
