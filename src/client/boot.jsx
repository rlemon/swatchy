import React from 'react';
import ReactDOM from 'react-dom';
import App from './app-wrapper';
import { Router, Route, browserHistory } from 'react-router';
import getPages from './pages';

const container = document.createElement('div');
container.id = 'app-container';
document.body.appendChild(container);

const pages = <Route path="/" component={App}>{getPages()}</Route>;

ReactDOM.render(<Router history={browserHistory}>{pages}</Router>, container);