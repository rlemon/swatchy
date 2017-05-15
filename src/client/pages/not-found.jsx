import React from 'react';

export default class NotFound extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <section className="component__section">
					<h2 className="component__sub-title">Something went on fire.</h2>
					<div className="banner">
						<div className="banner__content">
							<h2 className="banner__title">404</h2>
							<span className="banner__sub">we cannot find the page you are looking for.</span>
						</div>
					</div>
				</section>;
	}
}