import React from 'react';

export default class About extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <section className="component__section">
					<h2 className="component__sub-title">We make theming easier.</h2>
					<div className="banner">
						<div className="banner__content">
							<h2 className="banner__title">Swatchy pins your css to a set of colors you define</h2>
							<span className="banner__sub">because who uses css variables? come on.</span>
						</div>
					</div>
				</section>;
	}
}