import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import About from './about';
import InBrowser from './in-browser';
import Swatch from './swatch';
import NotFound from './not-found';

export default function getPages(props) {
	return [
		<IndexRoute component={About} key='route-about'/>,
		<Route path="/about" component={About} key='route-about' />,
		<Route path="/in-browser" component={InBrowser} key='route-repl' />,
		<Route path="/swatch" component={Swatch} key='route-swatch' />,
		<Route path="*" component={NotFound} key='route-notfound' />,
	];
}